import { PrismaClient } from "@prisma/client";

export class DeleteBusService {
  async execute(id: number) {
    const prisma = new PrismaClient();
    const busDeleted = await prisma.bus.delete({ where: { id } });
    return busDeleted;
  }
}
