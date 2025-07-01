"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const busController_1 = require("./controllers/busController");
const app = (0, express_1.default)();
const port = 3000;
const busController = new busController_1.BusController();

app.get("/", (_, res) => {
    res.send("Olá, mundo!");
});
app.get("/bus/quantity", (req, res, next) => {
    busController.getQuantityOfPeopleInBus(req, res, next);
});
app.listen(port, () => {
    console.log(`Servidor rodando na http://192.169.158.20:${port}`);
});
