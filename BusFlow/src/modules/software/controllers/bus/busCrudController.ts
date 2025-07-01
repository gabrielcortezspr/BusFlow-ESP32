import { CreateBusService } from "../../services/bus/crud/CreateBusService";
import { UpdateBusService } from "../../services/bus/crud/UpdateBusService";
import { DeleteBusService } from "../../services/bus/crud/DeleteBusService";
import { ListBusService } from "../../services/bus/crud/ListBusService";

import { GetQuantityOfPeopleInPeopleHistoryService } from "../../services/bus/useCases/GetQuantityOfPeopleInPeopleHistoryService";
import { AddOneInBusPeopleHistoryService } from "../../services/bus/useCases/AddOneInBusPeopleHistoryService";
import { RemoveOneInBusPeopleHistoryService } from "../../services/bus/useCases/RemoveOneInBusPeopleHistoryService";

import { Request, Response, NextFunction } from "express";

import { Bus } from "../../@types/index";

export class BusCrudController {
  createBus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = new CreateBusService();
      const result = await service.execute(req.body as Bus);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  updateBus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const service = new UpdateBusService();
      const result = await service.execute(id, req.body);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  deleteBus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const service = new DeleteBusService();
      const result = await service.execute(id);
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  listBuses = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const service = new ListBusService();
      const result = await service.execute();
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };
}
