export class AppError extends Error {
  constructor(message: string, public readonly statusCode = 400) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

/** Converte um valor vindo de body/query em um id inteiro positivo. */
export function parseId(value: unknown, field = "id"): number {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(`'${field}' deve ser um inteiro positivo`);
  }
  return id;
}

/** Converte uma data opcional; sem valor, usa o instante atual. */
export function parseDate(value: unknown): Date {
  if (value === undefined || value === null || value === "") return new Date();
  const date = new Date(value as string);
  if (Number.isNaN(date.getTime())) {
    throw new AppError("'date' deve estar em formato ISO 8601");
  }
  return date;
}
