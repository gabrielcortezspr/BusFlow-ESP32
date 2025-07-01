import { PrismaClient } from "@prisma/client";

export class ListBusService {
  async execute() {
    const prisma = new PrismaClient();
    const buses = await prisma.bus.findMany({
      include: {
        PeopleHistory: true,
      },
    });
    return buses;
  }
}
