import { PrismaClient } from "@prisma/client";
import { Bus } from "../../../@types/index";

export class CreateBusService {
  async execute(bus: Bus) {
    const prisma = new PrismaClient();
    console.log("bus", bus);
    const busCreated = await prisma.bus.create({ data: bus });
    return busCreated;
  }
}
