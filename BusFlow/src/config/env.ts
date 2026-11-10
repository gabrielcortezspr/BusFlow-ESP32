import "dotenv/config";

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  port: toNumber(process.env.PORT, 8888),
  mqttHost: process.env.MQTT_HOST ?? process.env.IP_SERVER ?? "localhost",
  mqttPort: toNumber(process.env.MQTT_PORT, 1883),
};
