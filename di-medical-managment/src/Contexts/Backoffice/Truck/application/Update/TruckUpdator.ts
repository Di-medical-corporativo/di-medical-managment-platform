import { TruckBrand } from "../../domain/TruckBrand";
import { TruckFinder } from "../../domain/TruckFinder";
import { TruckId } from "../../domain/TruckId";
import { TruckModel } from "../../domain/TruckModel";
import { TruckPlate } from "../../domain/TruckPlate";
import { TruckRepository } from "../../domain/TruckRepository";

export class TruckUpdator {
  private truckFinder: TruckFinder;
  
  constructor(
    private repository: TruckRepository
  ) {
    this.truckFinder = new TruckFinder(this.repository);
  }
  
  async run(params: {
    id: TruckId,
    plate: TruckPlate,
    model: TruckModel,
    brand: TruckBrand
  }) {
    const truck = await this.truckFinder.run({ id: params.id });

    truck.updateBrand(params.brand);
    truck.updateModel(params.model);
    truck.updatePlate(params.plate);

    await this.repository.update(truck);
  }
}
