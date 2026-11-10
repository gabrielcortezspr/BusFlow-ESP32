import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class GetQuantityOfPeopleInBusStopService {
  async execute(busStopId: number) {
    const busStop = await prisma.busStop.findUnique({ where: { id: busStopId } });
    if (!busStop) throw new NotFoundError("Bus stop not found");

    const lastHistory = await prisma.busStopHistory.findFirst({
      where: { busStopId },
      orderBy: { dateTime: "desc" },
    });

    return {
      busStopId,
      peopleCount: lastHistory?.peopleCount ?? 0,
      dateTime: lastHistory?.dateTime ?? null,
    };
  }
}
