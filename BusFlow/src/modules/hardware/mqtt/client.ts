import mqtt from "mqtt";
import { env } from "../../../config/env";

type MessageListener = (topic: string, message: Buffer) => void | Promise<void>;

/** Cliente MQTT único (singleton) compartilhado pela aplicação. */
export class MQTTClient {
  private static instance: MQTTClient;
  private client: mqtt.MqttClient;
  private messageListeners = new Map<string, MessageListener>();

  private constructor() {
    const url = `mqtt://${env.mqttHost}:${env.mqttPort}`;
    this.client = mqtt.connect(url);
    this.setupEventHandlers(url);
    this.setupMessageHandler();
  }

  public static getInstance(): MQTTClient {
    if (!MQTTClient.instance) {
      MQTTClient.instance = new MQTTClient();
    }
    return MQTTClient.instance;
  }

  private setupEventHandlers(url: string) {
    this.client.on("connect", () => {
      console.log(`Conectado ao broker MQTT em ${url}`);
      // (Re)inscreve em todos os tópicos a cada conexão, inclusive após quedas.
      for (const topic of this.messageListeners.keys()) this.subscribeOnBroker(topic);
    });
    this.client.on("error", (error) => console.error("Erro na conexão MQTT:", error.message));
    this.client.on("close", () => console.log("Conexão MQTT fechada"));
    this.client.on("reconnect", () => console.log("Tentando reconectar ao broker MQTT..."));
  }

  private setupMessageHandler() {
    this.client.on("message", async (topic, message) => {
      const listener = this.messageListeners.get(topic);
      if (!listener) return;
      try {
        await listener(topic, message);
      } catch (error) {
        // Uma mensagem inválida de um dispositivo não pode derrubar a API.
        console.error(`Erro ao processar mensagem do tópico ${topic}:`, error);
      }
    });
  }

  public subscribe(topic: string, callback: MessageListener) {
    this.messageListeners.set(topic, callback);
    if (this.client.connected) this.subscribeOnBroker(topic);
  }

  private subscribeOnBroker(topic: string) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Erro ao se inscrever no tópico ${topic}:`, err);
        return;
      }
      console.log(`Inscrito no tópico: ${topic}`);
    });
  }
}
