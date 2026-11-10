import { Request, Response } from "express";

import { GetQuantityOfPeopleInPeopleHistoryService } from "../../services/bus/useCases/GetQuantityOfPeopleInPeopleHistoryService";
import { AddOneInBusPeopleHistoryService } from "../../services/bus/useCases/AddOneInBusPeopleHistoryService";
import { RemoveOneInBusPeopleHistoryService } from "../../services/bus/useCases/RemoveOneInBusPeopleHistoryService";
import { parseDate, parseId } from "../../../../shared/errors";

export class BusUseCaseController {
  // GET /bus/quantity?busId=1
  getQuantityOfPeopleInBus = async (req: Request, res: Response) => {
    const busId = parseId(req.query.busId ?? req.query.id, "busId");
    const result = await new GetQuantityOfPeopleInPeopleHistoryService().execute(busId);
    res.json(result);
  };

  // POST /bus/in  { busId, date? }
  addPersonInPeopleHistory = async (req: Request, res: Response) => {
    const busId = parseId(req.body?.busId, "busId");
    const result = await new AddOneInBusPeopleHistoryService().execute(busId, parseDate(req.body?.date));
    res.status(201).json(result);
  };

  // POST /bus/out  { busId, date? }
  removePersonInPeopleHistory = async (req: Request, res: Response) => {
    const busId = parseId(req.body?.busId, "busId");
    const result = await new RemoveOneInBusPeopleHistoryService().execute(busId, parseDate(req.body?.date));
    res.status(201).json(result);
  };
}
