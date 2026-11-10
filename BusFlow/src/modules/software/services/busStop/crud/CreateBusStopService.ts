import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma";

export class CreateBusStopService {
  async execute(data: Prisma.BusStopCreateInput) {
    return prisma.busStop.create({ data });
  }
}
