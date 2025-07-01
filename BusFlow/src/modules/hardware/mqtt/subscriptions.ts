import { MQTTClient } from "./client";
import { handleHardwareMessage } from "./handlers";

export class HardwareSubscriptions {
  private mqttClient: MQTTClient;

  constructor() {
    this.mqttClient = MQTTClient.getInstance();
  }

  public setupSubscriptions() {
    // Exemplo de tópicos
    this.mqttClient.subscribe("bus/in", handleHardwareMessage);
    this.mqttClient.subscribe("bus/out", handleHardwareMessage);
    this.mqttClient.subscribe("busStop/lightDetection", handleHardwareMessage);
  }
}
