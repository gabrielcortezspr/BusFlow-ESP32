"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusStopController = void 0;
const CreateBusStopService_1 = require("../services/busStop/crud/CreateBusStopService");
const UpdateBusStopService_1 = require("../services/busStop/crud/UpdateBusStopService");
const DeleteBusStopService_1 = require("../services/busStop/crud/DeleteBusStopService");
const ListBusStopService_1 = require("../services/busStop/crud/ListBusStopService");
class BusStopController {
    constructor() {
        this.createBusStop = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bus_stop_id } = req.body;
                const service = new CreateBusStopService_1.CreateBusStopService();
                const result = yield service.execute(bus_stop_id);
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
        this.updateBusStop = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bus_stop_id } = req.body;
                const service = new UpdateBusStopService_1.UpdateBusStopService();
                const result = yield service.execute(bus_stop_id, req.body);
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
        this.deleteBusStop = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bus_stop_id } = req.body;
                const service = new DeleteBusStopService_1.DeleteBusStopService();
                const result = yield service.execute(bus_stop_id);
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
        this.listBusStops = (_, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new ListBusStopService_1.ListBusStopService();
                const result = yield service.execute();
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
    }
}
exports.BusStopController = BusStopController;
