import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { TruckId } from "../../../../../Contexts/Backoffice/Truck/domain/TruckId";
import { TruckBrand } from "../../../../../Contexts/Backoffice/Truck/domain/TruckBrand";
import { TruckModel } from "../../../../../Contexts/Backoffice/Truck/domain/TruckModel";
import { TruckPlate } from "../../../../../Contexts/Backoffice/Truck/domain/TruckPlate";
import { TruckUpdator } from "../../../../../Contexts/Backoffice/Truck/application/Update/TruckUpdator";
import { TruckNotFound } from "../../../../../Contexts/Backoffice/Truck/domain/TruckNotFound";

export class TruckUpdateController implements Controller {

  constructor(
    private truckUpdator: TruckUpdator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, plate, model, brand } = req.body;

      await this.truckUpdator.run({
        id: new TruckId(id),
        brand: new TruckBrand(brand),
        model: new TruckModel(model),
        plate: new TruckPlate(plate)
      });

      res.redirect('/backoffice/truck');
    } catch (error) {
      if(error instanceof TruckNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la camioneta'
        });
      }
      
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
