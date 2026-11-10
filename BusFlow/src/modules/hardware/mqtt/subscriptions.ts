import { MQTTClient } from "./client";
import { handleHardwareMessage, TOPICS } from "./handlers";

export class HardwareSubscriptions {
  private mqttClient = MQTTClient.getInstance();

  public setupSubscriptions() {
    for (const topic of Object.values(TOPICS)) {
      this.mqttClient.subscribe(topic, handleHardwareMessage);
    }
  }
}
