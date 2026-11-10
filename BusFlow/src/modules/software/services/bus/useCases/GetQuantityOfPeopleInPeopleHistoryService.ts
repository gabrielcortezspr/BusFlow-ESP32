import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class GetQuantityOfPeopleInPeopleHistoryService {
  async execute(busId: number) {
    const bus = await prisma.bus.findUnique({ where: { id: busId } });
    if (!bus) throw new NotFoundError("Bus not found");

    const lastHistory = await prisma.peopleHistory.findFirst({
      where: { busId },
      orderBy: { dateTime: "desc" },
    });

    return {
      busId,
      capacity: bus.capacity,
      peopleCount: lastHistory?.peopleCount ?? 0,
      dateTime: lastHistory?.dateTime ?? null,
    };
  }
}
