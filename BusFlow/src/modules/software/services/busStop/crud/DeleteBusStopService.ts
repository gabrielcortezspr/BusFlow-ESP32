import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class DeleteBusStopService {
  async execute(id: number) {
    const busStop = await prisma.busStop.findUnique({ where: { id } });
    if (!busStop) throw new NotFoundError("Bus stop not found");

    return prisma.busStop.delete({ where: { id } });
  }
}
