import { Request, Response } from "express";
import { TruckSearcher } from "../../../../../Contexts/Backoffice/Truck/application/SearchAll/TruckSearcher";

export class TruckFindAllController {
  constructor(
    private truckSearcher: TruckSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const trucks = await this.truckSearcher.run();
      
      res.render('trucks/main.ejs', {
        trucks: trucks.map(t => t.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });    
    }
  }
}
