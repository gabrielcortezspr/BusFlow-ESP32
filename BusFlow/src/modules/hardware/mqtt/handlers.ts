import { AddOneInBusPeopleHistoryService } from "../../software/services/bus/useCases/AddOneInBusPeopleHistoryService";
import { RemoveOneInBusPeopleHistoryService } from "../../software/services/bus/useCases/RemoveOneInBusPeopleHistoryService";
import { UpdateLightingBusStopState } from "../../software/services/busStop/useCases/UpdateLightingBusStopState";
import { parseDate, parseId } from "../../../shared/errors";

export const TOPICS = {
  busIn: "bus/in",
  busOut: "bus/out",
  busStopLightDetection: "busStop/lightDetection",
} as const;

/**
 * Recebe as mensagens publicadas pelos ESP32 e aciona diretamente os casos de
 * uso (sem passar por uma chamada HTTP para a própria API).
 */
export async function handleHardwareMessage(topic: string, message: Buffer) {
  const payload = JSON.parse(message.toString());
  console.log(`[mqtt] ${topic}:`, payload);

  switch (topic) {
    case TOPICS.busIn:
      await new AddOneInBusPeopleHistoryService().execute(
        parseId(payload.busId, "busId"),
        parseDate(payload.date)
      );
      break;

    case TOPICS.busOut:
      await new RemoveOneInBusPeopleHistoryService().execute(
        parseId(payload.busId, "busId"),
        parseDate(payload.date)
      );
      break;

    case TOPICS.busStopLightDetection:
      await new UpdateLightingBusStopState().execute(
        parseId(payload.busStopId, "busStopId"),
        payload.detection === true || payload.detection === "true"
      );
      break;
  }
}
