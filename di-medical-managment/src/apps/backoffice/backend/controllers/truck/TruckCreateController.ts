import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { TruckCreator } from "../../../../../Contexts/Backoffice/Truck/application/Create/TruckCreator";
import { TruckId } from "../../../../../Contexts/Backoffice/Truck/domain/TruckId";
import { TruckBrand } from "../../../../../Contexts/Backoffice/Truck/domain/TruckBrand";
import { TruckModel } from "../../../../../Contexts/Backoffice/Truck/domain/TruckModel";
import { TruckPlate } from "../../../../../Contexts/Backoffice/Truck/domain/TruckPlate";

export class TruckCreateController implements Controller {

  constructor(
    private truckCreator: TruckCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, plate, model, brand } = req.body;

      await this.truckCreator.run({
        id: new TruckId(id),
        brand: new TruckBrand(brand),
        model: new TruckModel(model),
        plate: new TruckPlate(plate)
      });

      res.redirect('/backoffice/truck');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
