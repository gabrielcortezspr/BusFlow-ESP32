import { PrismaClient } from "@prisma/client";

// Instância única compartilhada por toda a aplicação, evitando abrir
// um novo pool de conexões a cada requisição.
const prismaClient = new PrismaClient();

export default prismaClient;
