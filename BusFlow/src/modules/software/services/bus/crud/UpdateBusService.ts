import { PrismaClient } from "@prisma/client";

export class UpdateBusService {
  async execute(id: number, bus: Bus) {
    const prisma = new PrismaClient();
    const busUpdated = await prisma.bus.update({ where: { id }, data: bus });
    return busUpdated;
  }
}
