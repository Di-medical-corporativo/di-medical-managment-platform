import { Request, Response } from "express";

export class TechnicalFindAllController {
  constructor() {}

  async run(req: Request, res: Response) {
    try {
      res.status(200).render('technical/main')
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
