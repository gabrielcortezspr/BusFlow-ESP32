import { PrismaClient } from "@prisma/client";

///
export class GetQuantityOfPeopleInBusStopService {
  private prisma = new PrismaClient();

  async execute(id: number) {
    const busStop = await this.prisma.busStop.findUnique({
      where: { id },
    });

    if (!busStop) {
      throw new Error("Bus stop not found");
    }

    const lastBusStopHistory = await this.prisma.busStopHistory.findFirst({
      where: {
        busStopId: id,
      },
      orderBy: {
        dateTime: "desc",
      },
    });

    return lastBusStopHistory;
  }
}
