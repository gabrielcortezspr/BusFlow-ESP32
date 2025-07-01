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
exports.GetQuantityOfPeopleInBusService = void 0;
const client_1 = require("@prisma/client");
class GetQuantityOfPeopleInBusService {
    execute(busId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const busHistory = yield prisma.peopleHistory.findMany({
                where: {
                    busId: busId,
                    dateTime: {
                        gte: date, // data maior ou igual a data passada
                        lte: new Date(date.getTime() + 24 * 60 * 60 * 1000), // data menor ou igual a data passada + 1 dia
                    },
                },
            });
            return busHistory;
        });
    }
}
exports.GetQuantityOfPeopleInBusService = GetQuantityOfPeopleInBusService;
