import { PrismaClient } from "@prisma/client";

export class UpdateBusStopService {
  async execute(id: number, busStop: BusStop) {
    const prisma = new PrismaClient();
    const busStopUpdated = await prisma.busStop.update({
      where: { id: id },
      data: busStop,
    });
    return busStopUpdated;
  }
}
