import { Request, Response } from "express";

import { CreateBusService } from "../../services/bus/crud/CreateBusService";
import { UpdateBusService } from "../../services/bus/crud/UpdateBusService";
import { DeleteBusService } from "../../services/bus/crud/DeleteBusService";
import { ListBusService } from "../../services/bus/crud/ListBusService";
import { AppError, parseId } from "../../../../shared/errors";

type BusInput = { line?: number; capacity?: number; license?: string };

/** Mantém apenas os campos editáveis, evitando que o cliente altere id/datas. */
function pickBusFields(body: Record<string, unknown> = {}): BusInput {
  const data: BusInput = {};
  if (body.line !== undefined) data.line = Number(body.line);
  if (body.capacity !== undefined) data.capacity = Number(body.capacity);
  if (body.license !== undefined) data.license = String(body.license);
  return data;
}

function getBusId(req: Request): number {
  return parseId(req.params.id ?? req.body?.id, "id");
}

export class BusCrudController {
  createBus = async (req: Request, res: Response) => {
    const { line, capacity, license } = pickBusFields(req.body);
    if (line === undefined || capacity === undefined || license === undefined) {
      throw new AppError("'line', 'capacity' e 'license' são obrigatórios");
    }
    const result = await new CreateBusService().execute({ line, capacity, license });
    res.status(201).json(result);
  };

  updateBus = async (req: Request, res: Response) => {
    const result = await new UpdateBusService().execute(getBusId(req), pickBusFields(req.body));
    res.json(result);
  };

  deleteBus = async (req: Request, res: Response) => {
    const result = await new DeleteBusService().execute(getBusId(req));
    res.json(result);
  };

  listBuses = async (_: Request, res: Response) => {
    const result = await new ListBusService().execute();
    res.json(result);
  };
}
