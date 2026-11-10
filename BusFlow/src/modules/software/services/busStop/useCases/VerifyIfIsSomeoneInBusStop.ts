import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class VerifyIfIsSomeoneInBusStop {
  async execute(busStopId: number): Promise<boolean> {
    const busStop = await prisma.busStop.findUnique({ where: { id: busStopId } });
    if (!busStop) throw new NotFoundError("Bus stop not found");

    const lastBusStopHistory = await prisma.busStopHistory.findFirst({
      where: { busStopId },
      orderBy: { dateTime: "desc" },
    });

    return (lastBusStopHistory?.peopleCount ?? 0) > 0;
  }
}
