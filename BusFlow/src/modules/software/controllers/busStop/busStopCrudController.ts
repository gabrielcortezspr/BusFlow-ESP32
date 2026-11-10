import { Request, Response } from "express";

import { CreateBusStopService } from "../../services/busStop/crud/CreateBusStopService";
import { UpdateBusStopService } from "../../services/busStop/crud/UpdateBusStopService";
import { DeleteBusStopService } from "../../services/busStop/crud/DeleteBusStopService";
import { ListBusStopService } from "../../services/busStop/crud/ListBusStopService";
import { AppError, parseId } from "../../../../shared/errors";

type BusStopInput = { name?: string; latitude?: number; longitude?: number };

/** Mantém apenas os campos editáveis, evitando que o cliente altere id/datas. */
function pickBusStopFields(body: Record<string, unknown> = {}): BusStopInput {
  const data: BusStopInput = {};
  if (body.name !== undefined) data.name = String(body.name);
  if (body.latitude !== undefined) data.latitude = Number(body.latitude);
  if (body.longitude !== undefined) data.longitude = Number(body.longitude);
  return data;
}

function getBusStopId(req: Request): number {
  return parseId(req.params.id ?? req.body?.busStopId ?? req.body?.id, "busStopId");
}

export class BusStopCrudController {
  createBusStop = async (req: Request, res: Response) => {
    const { name, latitude, longitude } = pickBusStopFields(req.body);
    if (name === undefined || latitude === undefined || longitude === undefined) {
      throw new AppError("'name', 'latitude' e 'longitude' são obrigatórios");
    }
    const result = await new CreateBusStopService().execute({ name, latitude, longitude });
    res.status(201).json(result);
  };

  updateBusStop = async (req: Request, res: Response) => {
    const result = await new UpdateBusStopService().execute(getBusStopId(req), pickBusStopFields(req.body));
    res.json(result);
  };

  deleteBusStop = async (req: Request, res: Response) => {
    const result = await new DeleteBusStopService().execute(getBusStopId(req));
    res.json(result);
  };

  listBusStops = async (_: Request, res: Response) => {
    const result = await new ListBusStopService().execute();
    res.json(result);
  };
}
