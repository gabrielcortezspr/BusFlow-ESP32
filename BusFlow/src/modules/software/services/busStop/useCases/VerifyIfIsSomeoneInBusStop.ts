import { PrismaClient } from "@prisma/client";

///
export class VerifyIfIsSomeoneInBusStop {
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

    if (lastBusStopHistory.peopleCount > 0) {
      return true;
    }

    return false;
  }
}
