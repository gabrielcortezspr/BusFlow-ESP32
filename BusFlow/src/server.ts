import { env } from "./config/env";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Prisma } from "@prisma/client";

import { router } from "./routes";
import { AppError } from "./shared/errors";
import { HardwareSubscriptions } from "./modules/hardware/mqtt/subscriptions";
import prisma from "./prisma";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Express 5 encaminha automaticamente erros de handlers async para cá.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ error: "Dados inválidos" });
    return;
  }
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: "JSON inválido" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const server = app.listen(env.port, () => {
  console.log(`API BusFlow rodando na porta ${env.port}`);
});

new HardwareSubscriptions().setupSubscriptions();

async function shutdown() {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
