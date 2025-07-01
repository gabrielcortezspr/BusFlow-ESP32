import mqtt from "mqtt";

export class MQTTClient {
  private static instance: MQTTClient;
  private client: mqtt.MqttClient;
  private messageListeners: Map<
    string,
    (topic: string, message: Buffer) => void
  > = new Map();

  private constructor() {
    const ip = process.env.IP_SERVER;
    const port = process.env.MQTT_PORT;
    // Usando o mesmo IP que você está usando no mosquitto_sub
    this.client = mqtt.connect(`mqtt://${ip}:${port}`);
    this.setupEventHandlers();
    this.setupMessageHandler();
  }

  public static getInstance(): MQTTClient {
    if (!MQTTClient.instance) {
      MQTTClient.instance = new MQTTClient();
    }
    return MQTTClient.instance;
  }

  private setupEventHandlers() {
    this.client.on("connect", () => {
      console.log(
        `Conectado ao broker MQTT em ${process.env.IP_SERVER}:${process.env.MQTT_PORT}`
      );
    });

    this.client.on("error", (error) => {
      console.error("Erro na conexão MQTT:", error);
    });

    this.client.on("close", () => {
      console.log("Conexão MQTT fechada");
    });

    this.client.on("reconnect", () => {
      console.log("Tentando reconectar ao broker MQTT...");
    });
  }

  private setupMessageHandler() {
    this.client.on("message", (topic: string, message: Buffer) => {
      const listener = this.messageListeners.get(topic);
      if (listener) {
        listener(topic, message);
      }
    });
  }

  public subscribe(
    topic: string,
    callback: (topic: string, message: Buffer) => void
  ) {
    console.log(`Tentando se inscrever no tópico: ${topic}`);

    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Erro ao se inscrever no tópico ${topic}:`, err);
        return;
      }
      console.log(`Inscrito com sucesso no tópico: ${topic}`);

      this.messageListeners.set(topic, callback);
    });
  }
}
