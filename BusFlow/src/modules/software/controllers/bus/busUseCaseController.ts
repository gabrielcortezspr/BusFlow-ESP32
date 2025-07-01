import { GetQuantityOfPeopleInPeopleHistoryService } from "../../services/bus/useCases/GetQuantityOfPeopleInPeopleHistoryService";
import { AddOneInBusPeopleHistoryService } from "../../services/bus/useCases/AddOneInBusPeopleHistoryService";
import { RemoveOneInBusPeopleHistoryService } from "../../services/bus/useCases/RemoveOneInBusPeopleHistoryService";

import { Request, Response, NextFunction } from "express";

export class BusUseCaseController {
  getQuantityOfPeopleInBus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;

      const service = new GetQuantityOfPeopleInPeopleHistoryService();
      const result = await service.execute(id);

      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  addPersonInPeopleHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { busId, date } = req.body;

      const service = new AddOneInBusPeopleHistoryService();
      const result = await service.execute(busId, new Date(date));
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };

  removePersonInPeopleHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { busId, date } = req.body;

      const service = new RemoveOneInBusPeopleHistoryService();
      const result = await service.execute(busId, new Date(date));
      return res.json(result);
    } catch (error) {
      next(error);
      return;
    }
  };
}
