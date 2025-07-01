import { PrismaClient } from "@prisma/client";

///
export class UpdateQuantityOfPeopleInBusStopService {
  private prisma = new PrismaClient();

  async execute(id: number, data: any) {
    const busStop = await this.prisma.busStop.findUnique({
      where: { id },
    });

    if (!busStop) {
      throw new Error("Bus stop not found");
    }

    const today = new Date();

    const newBusStopHistory = await this.prisma.busStopHistory.create({
      data: {
        busStopId: id,
        peopleCount: data.quantity,
        dateTime: today,
      },
    });

    return newBusStopHistory;
  }
}
