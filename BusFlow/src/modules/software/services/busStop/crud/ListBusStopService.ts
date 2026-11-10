import prisma from "../../../../../prisma";

export class ListBusStopService {
  async execute() {
    return prisma.busStop.findMany({
      include: { BusStopHistory: { orderBy: { dateTime: "asc" } } },
    });
  }
}
