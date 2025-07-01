import { Request, Response, NextFunction } from "express";

import { CreateBusStopService } from "../../services/busStop/crud/CreateBusStopService";
import { UpdateBusStopService } from "../../services/busStop/crud/UpdateBusStopService";
import { DeleteBusStopService } from "../../services/busStop/crud/DeleteBusStopService";
import { ListBusStopService } from "../../services/busStop/crud/ListBusStopService";

export class BusStopCrudController {
  createBusStop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = new CreateBusStopService();
      const result = await service.execute(req.body as BusStop);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  updateBusStop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { busStopId } = req.body;
      const service = new UpdateBusStopService();
      const result = await service.execute(busStopId, req.body);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  deleteBusStop = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { busStopId } = req.body;
      const service = new DeleteBusStopService();
      const result = await service.execute(busStopId);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  listBusStops = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const service = new ListBusStopService();
      const result = await service.execute();
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };
}
