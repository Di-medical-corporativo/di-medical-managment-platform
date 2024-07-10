import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { TruckCreator } from "../../../../../Contexts/Warehouse/Truck/application/Create/TruckCreator";
import { TruckId } from "../../../../../Contexts/Warehouse/Truck/domain/TruckId";
import { TruckBrand } from "../../../../../Contexts/Warehouse/Truck/domain/TruckBrand";
import { TruckModel } from "../../../../../Contexts/Warehouse/Truck/domain/TruckModel";
import { TruckPlate } from "../../../../../Contexts/Warehouse/Truck/domain/TruckPlate";

export class TruckCreateController implements Controller {

  constructor(
    private truckCreator: TruckCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id, plate, model, brand } = req.body;

    await this.truckCreator.run({
      id: new TruckId(id),
      brand: new TruckBrand(brand),
      model: new TruckModel(model),
      plate: new TruckPlate(plate)
    });

    res.sendStatus(201);
  }
}
