import { Request, Response, NextFunction } from "express";

import { UpdateQuantityOfPeopleInBusStopService } from "../../services/busStop/useCases/UpdateQuantityOfPeopleInBusStopService";
import { GetQuantityOfPeopleInBusStopService } from "../../services/busStop/useCases/GetQuantityOfPeopleInBusStopService";
import { UpdateLightingBusStopState } from "../../services/busStop/useCases/UpdateLightingBusStopState";

export class BusStopUseCaseController {
  updateQuantityOfPeopleInBusStop = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { busStopId } = req.body;
      const service = new UpdateQuantityOfPeopleInBusStopService();
      const result = await service.execute(busStopId, req.body);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  getQuantityOfPeopleInBusStop = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { busStopId } = req.query;
      const service = new GetQuantityOfPeopleInBusStopService();
      const result = await service.execute(Number(busStopId));
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  updateLightingBusStopState = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { busStopId } = req.body;
      const service = new UpdateLightingBusStopState();
      const result = await service.execute(busStopId, req.body);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };
}
