import { PrismaClient } from "@prisma/client";

export class CreateBusStopService {
  async execute(busStop: BusStop) {
    const prisma = new PrismaClient();
    const busStopCreated = await prisma.busStop.create({ data: busStop });
    return busStopCreated;
  }
}
