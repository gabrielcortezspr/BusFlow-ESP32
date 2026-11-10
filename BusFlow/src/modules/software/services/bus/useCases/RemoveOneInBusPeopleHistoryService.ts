import { registerPeopleChange } from "./registerPeopleChange";

export class RemoveOneInBusPeopleHistoryService {
  async execute(busId: number, date: Date) {
    return registerPeopleChange(busId, -1, date);
  }
}
