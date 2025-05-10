import { Request, Response } from "express";

export class ProductsFindAllController {
  constructor(
  ) {}

  async run(req: Request, res: Response) {
    try {
      res.status(200).render('products/main');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
