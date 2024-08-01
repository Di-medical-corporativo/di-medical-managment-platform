import { TruckFinder } from "../../../../../Contexts/Backoffice/Truck/domain/TruckFinder";
import { Request, Response } from "express";
import { TruckId } from "../../../../../Contexts/Backoffice/Truck/domain/TruckId";
import { TruckNotFound } from "../../../../../Contexts/Backoffice/Truck/domain/TruckNotFound";

export class TruckSearchController {
  constructor(
    private truckFinder: TruckFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const truck = await this.truckFinder.run({
        id: new TruckId(id)
      });

      res.status(200).render('trucks/update', {
        truckData: truck.toPrimitives()
      });
    } catch (error) {
      if(error instanceof TruckNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la camioneta'
        })
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
