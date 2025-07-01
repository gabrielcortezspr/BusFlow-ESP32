import { PrismaClient } from "@prisma/client";

export class DeleteBusStopService {
  async execute(id: number) {
    const prisma = new PrismaClient();
    const busStopDeleted = await prisma.busStop.delete({
      where: { id: id },
    });
    return busStopDeleted;
  }
}
