import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class UpdateBusService {
  async execute(id: number, data: Prisma.BusUpdateInput) {
    const bus = await prisma.bus.findUnique({ where: { id } });
    if (!bus) throw new NotFoundError("Bus not found");

    return prisma.bus.update({ where: { id }, data });
  }
}
