import { SucursalSearcher } from "../../../../../Contexts/Backoffice/Sucursal/application/SearchAll/SucursalSearcher";
import { Request, Response } from "express";

export class SucursalFindAllController {
  constructor(
    private sucursalSearcher: SucursalSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const branches = await this.sucursalSearcher.run();

      res.status(200).render('branches/main', {
        branches: branches.map(b => b.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error'
      });
    } 
  }
}
