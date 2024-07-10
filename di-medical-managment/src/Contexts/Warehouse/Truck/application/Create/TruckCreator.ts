import { Truck } from "../../domain/Truck";
import { TruckBrand } from "../../domain/TruckBrand";
import { TruckId } from "../../domain/TruckId";
import { TruckModel } from "../../domain/TruckModel";
import { TruckPlate } from "../../domain/TruckPlate";
import { TruckRepository } from "../../domain/TruckRepository";

export class TruckCreator {

  constructor(
    private repository: TruckRepository
  ) {}

  async run(params: {
    id: TruckId,
    plate: TruckPlate,
    brand: TruckBrand,
    model: TruckModel
  }) {
    const truck = Truck.create(params);

    await this.repository.save(truck);
  }
}
