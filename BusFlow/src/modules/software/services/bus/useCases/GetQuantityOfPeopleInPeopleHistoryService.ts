import { PrismaClient } from "@prisma/client";

export class GetQuantityOfPeopleInPeopleHistoryService {
  async execute(busId: number) {
    const prisma = new PrismaClient();

    const busHistory = await prisma.peopleHistory.findFirst({
      where: {
        busId: busId,
      },
      orderBy: {
        dateTime: "desc",
      },
    });

    const quantityOfPeopleInBus = busHistory?.peopleCount;

    return quantityOfPeopleInBus;
  }
}
