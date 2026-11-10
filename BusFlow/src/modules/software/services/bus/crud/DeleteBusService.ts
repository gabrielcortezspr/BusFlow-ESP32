import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

export class DeleteBusService {
  async execute(id: number) {
    const bus = await prisma.bus.findUnique({ where: { id } });
    if (!bus) throw new NotFoundError("Bus not found");

    return prisma.bus.delete({ where: { id } });
  }
}
