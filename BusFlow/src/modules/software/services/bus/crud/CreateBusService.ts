import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma";

export class CreateBusService {
  async execute(data: Prisma.BusCreateInput) {
    return prisma.bus.create({ data });
  }
}
