import { PrismaClient } from "@prisma/client";

export class ListBusStopService {
  async execute() {
    const prisma = new PrismaClient();
    const busStops = await prisma.busStop.findMany({
      include: {
        BusStopHistory: true,
      },
    });
    return busStops;
  }
}
