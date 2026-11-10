import { Request, Response } from "express";

import { UpdateQuantityOfPeopleInBusStopService } from "../../services/busStop/useCases/UpdateQuantityOfPeopleInBusStopService";
import { GetQuantityOfPeopleInBusStopService } from "../../services/busStop/useCases/GetQuantityOfPeopleInBusStopService";
import { UpdateLightingBusStopState } from "../../services/busStop/useCases/UpdateLightingBusStopState";
import { parseId } from "../../../../shared/errors";

export class BusStopUseCaseController {
  // POST /bus-stop/quantity  { busStopId, quantity }  (enviado pelo app de câmera)
  updateQuantityOfPeopleInBusStop = async (req: Request, res: Response) => {
    const busStopId = parseId(req.body?.busStopId, "busStopId");
    const result = await new UpdateQuantityOfPeopleInBusStopService().execute(
      busStopId,
      Number(req.body?.quantity)
    );
    res.status(201).json(result);
  };

  // GET /bus-stop/quantity?busStopId=1
  getQuantityOfPeopleInBusStop = async (req: Request, res: Response) => {
    const busStopId = parseId(req.query.busStopId, "busStopId");
    const result = await new GetQuantityOfPeopleInBusStopService().execute(busStopId);
    res.json(result);
  };

  // POST /bus-stop/lightDetection  { busStopId, detection }
  updateLightingBusStopState = async (req: Request, res: Response) => {
    const busStopId = parseId(req.body?.busStopId, "busStopId");
    const detection = req.body?.detection === true || req.body?.detection === "true";
    const result = await new UpdateLightingBusStopState().execute(busStopId, detection);
    res.status(201).json(result);
  };
}
