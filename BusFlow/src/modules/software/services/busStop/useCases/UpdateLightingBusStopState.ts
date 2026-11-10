import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class UpdateLightingBusStopState {
  async execute(busStopId: number, detection: boolean) {
    const busStop = await prisma.busStop.findUnique({ where: { id: busStopId } });
    if (!busStop) throw new NotFoundError("Bus stop not found");

    return prisma.lightingHistory.create({
      data: { busStopId, light: detection, dateTime: new Date() },
    });
  }
}
