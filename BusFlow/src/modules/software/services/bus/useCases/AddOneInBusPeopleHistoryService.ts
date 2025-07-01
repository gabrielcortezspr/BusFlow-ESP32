import { PrismaClient } from "@prisma/client";

export class AddOneInBusPeopleHistoryService {
  async execute(busId: number, date: Date) {
    const prisma = new PrismaClient();

    const bus = await prisma.bus.findUnique({
      where: { id: busId },
    });

    if (!bus) {
      throw new Error("Bus not found");
    }

    const lastPeopleHistory = await prisma.peopleHistory.findFirst({
      where: {
        busId: busId,
      },
      orderBy: {
        dateTime: "desc",
      },
    });

    const newPeopleCount = lastPeopleHistory
      ? lastPeopleHistory.peopleCount + 1
      : 1;

    const newHistory = await prisma.peopleHistory.create({
      data: {
        busId: busId,
        peopleCount: newPeopleCount,
        dateTime: date,
      },
    });

    return newHistory;
  }
}
