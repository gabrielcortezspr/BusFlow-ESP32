import prisma from "../../../../../prisma";
import { AppError, NotFoundError } from "../../../../../shared/errors";

export class UpdateQuantityOfPeopleInBusStopService {
  async execute(busStopId: number, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new AppError("'quantity' deve ser um inteiro >= 0");
    }

    const busStop = await prisma.busStop.findUnique({ where: { id: busStopId } });
    if (!busStop) throw new NotFoundError("Bus stop not found");

    return prisma.busStopHistory.create({
      data: { busStopId, peopleCount: quantity, dateTime: new Date() },
    });
  }
}
