import prisma from "../../../../../prisma";

export class ListBusService {
  async execute() {
    return prisma.bus.findMany({
      include: { PeopleHistory: { orderBy: { dateTime: "asc" } } },
    });
  }
}
