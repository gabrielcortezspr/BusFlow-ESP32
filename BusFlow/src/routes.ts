import { Router } from "express";

import { BusCrudController } from "./modules/software/controllers/bus/busCrudController";
import { BusUseCaseController } from "./modules/software/controllers/bus/busUseCaseController";
import { BusStopCrudController } from "./modules/software/controllers/busStop/busStopCrudController";
import { BusStopUseCaseController } from "./modules/software/controllers/busStop/busStopUseCaseController";

const busCrud = new BusCrudController();
const busUseCase = new BusUseCaseController();
const busStopCrud = new BusStopCrudController();
const busStopUseCase = new BusStopUseCaseController();

export const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Ônibus - CRUD (o id pode vir na URL ou no body, por compatibilidade)
router.get("/bus", busCrud.listBuses);
router.post("/bus", busCrud.createBus);
router.put("/bus", busCrud.updateBus);
router.put("/bus/:id", busCrud.updateBus);
router.delete("/bus", busCrud.deleteBus);
router.delete("/bus/:id", busCrud.deleteBus);

// Ônibus - casos de uso
router.get("/bus/quantity", busUseCase.getQuantityOfPeopleInBus);
router.post("/bus/in", busUseCase.addPersonInPeopleHistory);
router.post("/bus/out", busUseCase.removePersonInPeopleHistory);

// Paradas - CRUD
router.get("/bus-stop", busStopCrud.listBusStops);
router.post("/bus-stop", busStopCrud.createBusStop);
router.put("/bus-stop", busStopCrud.updateBusStop);
router.put("/bus-stop/:id", busStopCrud.updateBusStop);
router.delete("/bus-stop", busStopCrud.deleteBusStop);
router.delete("/bus-stop/:id", busStopCrud.deleteBusStop);

// Paradas - casos de uso
router.get("/bus-stop/quantity", busStopUseCase.getQuantityOfPeopleInBusStop);
router.post("/bus-stop/quantity", busStopUseCase.updateQuantityOfPeopleInBusStop);
router.post("/bus-stop/lightDetection", busStopUseCase.updateLightingBusStopState);
