import { PrismaClient } from "@prisma/client";

///
export class VerifyBusStopLightDetection {
  private prisma = new PrismaClient();

  async execute(id: number) {
    const busStop = await this.prisma.busStop.findUnique({
      where: { id },
    });

    if (!busStop) {
      throw new Error("Bus stop not found");
    }

    const lastLightingHistory = await this.prisma.lightingHistory.findFirst({
      where: {
        busStopId: id,
      },
      orderBy: {
        dateTime: "desc",
      },
    });

    return lastLightingHistory.light;
  }
}
