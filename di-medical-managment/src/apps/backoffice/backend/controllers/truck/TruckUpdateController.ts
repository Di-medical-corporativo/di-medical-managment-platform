import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { TruckCreator } from "../../../../../Contexts/Backoffice/Truck/application/Create/TruckCreator";
import { TruckId } from "../../../../../Contexts/Backoffice/Truck/domain/TruckId";
import { TruckBrand } from "../../../../../Contexts/Backoffice/Truck/domain/TruckBrand";
import { TruckModel } from "../../../../../Contexts/Backoffice/Truck/domain/TruckModel";
import { TruckPlate } from "../../../../../Contexts/Backoffice/Truck/domain/TruckPlate";
import { TruckUpdator } from "../../../../../Contexts/Backoffice/Truck/application/Update/TruckUpdator";

export class TruckUpdateController implements Controller {

  constructor(
    private truckUpdator: TruckUpdator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id, plate, model, brand } = req.body;

    await this.truckUpdator.run({
      id: new TruckId(id),
      brand: new TruckBrand(brand),
      model: new TruckModel(model),
      plate: new TruckPlate(plate)
    });

    res.sendStatus(200);
  }
}
