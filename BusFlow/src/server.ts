import express, { Request, Response, NextFunction } from "express";
import { BusCrudController } from "./modules/software/controllers/bus/busCrudController";
import { BusUseCaseController } from "./modules/software/controllers/bus/busUseCaseController";
import cors from "cors";

import { BusStopCrudController } from "./modules/software/controllers/busStop/busStopCrudController";
import { BusStopUseCaseController } from "./modules/software/controllers/busStop/busStopUseCaseController";

import { HardwareSubscriptions } from "./modules/hardware/mqtt/subscriptions";

const hardwareSubscriptions = new HardwareSubscriptions();
hardwareSubscriptions.setupSubscriptions();

const app = express();
const port = 8888;
const ip = process.env.IP_SERVER;

const busCrudController = new BusCrudController();
const busUseCaseController = new BusUseCaseController();

const busStopCrudController = new BusStopCrudController();
const busStopUseCaseController = new BusStopUseCaseController();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Olá, mundo!");
});

//#region Bus Crud Routes
// Bus Crud Routes
app.get("/bus", (req: Request, res: Response, next: NextFunction) => {
  busCrudController.listBuses(req, res, next);
});

app.post("/bus", (req: Request, res: Response, next: NextFunction) => {
  busCrudController.createBus(req, res, next);
});

app.put("/bus", (req: Request, res: Response, next: NextFunction) => {
  busCrudController.updateBus(req, res, next);
});

app.delete("/bus", (req: Request, res: Response, next: NextFunction) => {
  busCrudController.deleteBus(req, res, next);
});
//#endregion

//#region Bus UseCases Routes
// Bus UseCases Routes
app.get("/bus/quantity", (req: Request, res: Response, next: NextFunction) => {
  busUseCaseController.getQuantityOfPeopleInBus(req, res, next);
});

app.post("/bus/in", (req: Request, res: Response, next: NextFunction) => {
  busUseCaseController.addPersonInPeopleHistory(req, res, next);
});

app.post("/bus/out", (req: Request, res: Response, next: NextFunction) => {
  busUseCaseController.removePersonInPeopleHistory(req, res, next);
});
//#endregion

//#region Bus Stop Crud Routes
// Bus Stop Crud Routes
app.get("/bus-stop", (req: Request, res: Response, next: NextFunction) => {
  busStopCrudController.listBusStops(req, res, next);
});

app.post("/bus-stop", (req: Request, res: Response, next: NextFunction) => {
  busStopCrudController.createBusStop(req, res, next);
});

app.put("/bus-stop", (req: Request, res: Response, next: NextFunction) => {
  busStopCrudController.updateBusStop(req, res, next);
});

app.delete("/bus-stop", (req: Request, res: Response, next: NextFunction) => {
  busStopCrudController.deleteBusStop(req, res, next);
});
//#endregion

//#region Bus Stop UseCases Routes
// Bus Stop UseCases Routes
app.get(
  "/bus-stop/quantity",
  (req: Request, res: Response, next: NextFunction) => {
    busStopUseCaseController.getQuantityOfPeopleInBusStop(req, res, next);
  }
);

app.post(
  "/bus-stop/quantity",
  (req: Request, res: Response, next: NextFunction) => {
    busStopUseCaseController.updateQuantityOfPeopleInBusStop(req, res, next);
  }
);

app.post(
  "/bus-stop/lightDetection",
  (req: Request, res: Response, next: NextFunction) => {
    busStopUseCaseController.updateLightingBusStopState(req, res, next);
  }
);
//#endregion

//#region Server
app.listen(port, () => {
  console.log(`Servidor rodando na http://${ip}:${port}`);
});
//#endregion
