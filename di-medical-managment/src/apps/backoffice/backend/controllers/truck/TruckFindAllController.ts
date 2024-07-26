import { Request, Response } from "express";

export class TruckFindAllController {
  constructor() {}

  async run(req: Request, res: Response) {
    try {
      res.status(200).render('trucks/main.ejs');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });    
    }
  }
}
