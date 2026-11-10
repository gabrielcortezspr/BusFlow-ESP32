import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class VerifyBusStopLightDetection {
  async execute(busStopId: number): Promise<boolean> {
    const busStop = await prisma.busStop.findUnique({ where: { id: busStopId } });
    if (!busStop) throw new NotFoundError("Bus stop not found");

    const lastLightingHistory = await prisma.lightingHistory.findFirst({
      where: { busStopId },
      orderBy: { dateTime: "desc" },
    });

    return lastLightingHistory?.light ?? false;
  }
}
