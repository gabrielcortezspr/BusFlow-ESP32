import prisma from "../../../../../prisma";
import { NotFoundError } from "../../../../../shared/errors";

/**
 * Registra uma nova entrada no histórico de ocupação do ônibus aplicando
 * `delta` (+1 entrada, -1 saída) sobre a última contagem. A contagem nunca
 * fica negativa. Cada evento gera um novo registro, preservando o histórico.
 */
export async function registerPeopleChange(busId: number, delta: 1 | -1, date: Date) {
  const bus = await prisma.bus.findUnique({ where: { id: busId } });
  if (!bus) throw new NotFoundError("Bus not found");

  return prisma.$transaction(async (tx) => {
    const lastHistory = await tx.peopleHistory.findFirst({
      where: { busId },
      orderBy: { dateTime: "desc" },
    });

    const peopleCount = Math.max(0, (lastHistory?.peopleCount ?? 0) + delta);

    return tx.peopleHistory.create({
      data: { busId, peopleCount, dateTime: date },
    });
  });
}
