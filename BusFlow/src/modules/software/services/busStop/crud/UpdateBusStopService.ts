import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class UpdateBusStopService {
  async execute(id: number, data: Prisma.BusStopUpdateInput) {
    const busStop = await prisma.busStop.findUnique({ where: { id } });
    if (!busStop) throw new NotFoundError("Bus stop not found");

    return prisma.busStop.update({ where: { id }, data });
  }
}
