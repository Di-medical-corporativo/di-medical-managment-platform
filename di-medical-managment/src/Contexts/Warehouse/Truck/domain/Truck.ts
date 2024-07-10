import { TruckBrand } from "./TruckBrand";
import { TruckId } from "./TruckId";
import { TruckModel } from "./TruckModel";
import { TruckPlate } from "./TruckPlate";


export class Truck {
  constructor(
    private id: TruckId,
    private plate: TruckPlate,
    private model: TruckModel,
    private brand: TruckBrand
  ) {}

  static create(data: {
    id: TruckId,
    plate: TruckPlate,
    model: TruckModel,
    brand: TruckBrand
  }) {
    return new Truck(
      data.id,
      data.plate,
      data.model,
      data.brand
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      plate: this.plate.toString(),
      model: this.model.toString(),
      brand: this.brand.toString()
    }
  }

  static fromPrimities(data: {
    id: string;
    plate: string;
    model: string;
    brand: string;
  }) {
    return new Truck(
      new TruckId(data.id),
      new TruckPlate(data.plate),
      new TruckModel(data.model),
      new TruckBrand(data.brand)
    );
  }

}
