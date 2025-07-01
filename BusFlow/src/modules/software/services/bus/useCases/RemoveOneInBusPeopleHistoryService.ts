import { PrismaClient } from "@prisma/client";

export class RemoveOneInBusPeopleHistoryService {
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

    if (lastPeopleHistory) {
      const newPeopleCount =
        lastPeopleHistory.peopleCount > 0
          ? lastPeopleHistory.peopleCount - 1
          : 0;
      await prisma.peopleHistory.update({
        where: { id: lastPeopleHistory.id },
        data: { peopleCount: newPeopleCount },
      });
    } else {
      await prisma.peopleHistory.create({
        data: { busId: busId, peopleCount: 0, dateTime: date },
      });
    }

    return lastPeopleHistory;
  }
}
