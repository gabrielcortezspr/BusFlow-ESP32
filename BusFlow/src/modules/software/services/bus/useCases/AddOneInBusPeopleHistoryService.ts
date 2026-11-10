import { registerPeopleChange } from "./registerPeopleChange";

export class AddOneInBusPeopleHistoryService {
  async execute(busId: number, date: Date) {
    return registerPeopleChange(busId, 1, date);
  }
}
