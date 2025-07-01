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
exports.BusController = void 0;
const CreateBusService_1 = require("../services/bus/crud/CreateBusService");
const UpdateBusService_1 = require("../services/bus/crud/UpdateBusService");
const DeleteBusService_1 = require("../services/bus/crud/DeleteBusService");
const ListBusService_1 = require("../services/bus/crud/ListBusService");
const getQuantityOfPeopleInBusService_1 = require("../services/bus/otherServices/getQuantityOfPeopleInBusService");
class BusController {
    constructor() {
        this.createBus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bus_id } = req.body;
                const service = new CreateBusService_1.CreateBusService();
                const result = yield service.execute(bus_id);
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
        this.updateBus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bus_id } = req.body;
                const service = new UpdateBusService_1.UpdateBusService();
                const result = yield service.execute(bus_id, req.body);
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
        this.deleteBus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bus_id } = req.body;
                const service = new DeleteBusService_1.DeleteBusService();
                const result = yield service.execute(bus_id);
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
        this.listBuses = (_, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new ListBusService_1.ListBusService();
                const result = yield service.execute();
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
        this.getQuantityOfPeopleInBus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bus_id, date } = req.query;
                const service = new getQuantityOfPeopleInBusService_1.GetQuantityOfPeopleInBusService();
                const result = yield service.execute(parseInt(bus_id), new Date(date));
                return res.json(result);
            }
            catch (error) {
                next(error);
                return;
            }
        });
    }
}
exports.BusController = BusController;
