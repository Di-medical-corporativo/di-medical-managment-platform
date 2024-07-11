import { TruckId } from "./TruckId";
import { TruckNotFound } from "./TruckNotFound";
import { TruckRepository } from "./TruckRepository";

export class TruckFinder {
  constructor(
    private repository: TruckRepository
  ) {}

  async run(params: {
    id: TruckId;
  }) {
    const truck = await this.repository.search(params.id.toString());
    
    if(truck === null) {
      throw new TruckNotFound();
    }

    return truck;
  }
}
