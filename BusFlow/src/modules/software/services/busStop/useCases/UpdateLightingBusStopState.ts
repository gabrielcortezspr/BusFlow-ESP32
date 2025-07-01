import { PrismaClient } from "@prisma/client";

/// UpdateLightingBusStopState
export class UpdateLightingBusStopState {
  private prisma = new PrismaClient();

  async execute(id: number, data: any) {
    const busStop = await this.prisma.busStop.findUnique({
      where: { id },
    });

    if (!busStop) {
      throw new Error("Bus stop not found");
    }

    const newHistory = await this.prisma.lightingHistory.create({
      data: {
        busStopId: id,
        light: data.detection,
        dateTime: new Date(),
      },
    });

    return newHistory;
  }
}
