import axios from "axios";

export function handleHardwareMessage(topic: string, message: Buffer) {
  const rawPayload = JSON.parse(message.toString());

  console.log("topic:", topic);
  console.log("payload:", rawPayload);

  const ip = process.env.IP_SERVER;

  // Inicializa payload com o valor original
  let payload = rawPayload;

  // Corrige o tipo apenas para o tópico de detecção de luz
  if (topic === "busStop/lightDetection") {
    payload = {
      ...rawPayload,
      detection:
        rawPayload.detection === "true" || rawPayload.detection === true,
    };
    axios.post(`http://${ip}:8888/bus-stop/lightDetection`, payload);
  } else if (topic === "bus/in") {
    axios.post(`http://${ip}:8888/bus/in`, payload);
  } else if (topic === "bus/out") {
    axios.post(`http://${ip}:8888/bus/out`, payload);
  }
}
