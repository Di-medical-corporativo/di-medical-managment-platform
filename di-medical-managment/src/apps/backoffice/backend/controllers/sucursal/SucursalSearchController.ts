import { SucursalFinder } from "../../../../../Contexts/Backoffice/Sucursal/domain/SucursalFinder";
import { Request, Response } from "express";
import { SucursalId } from "../../../../../Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalNotFound } from "../../../../../Contexts/Backoffice/Sucursal/domain/SucursalNotFound";
import { Sucursal } from "../../../../../Contexts/Backoffice/Sucursal/domain/Sucursal";

export class SucursalSearchController {
  constructor(
    private sucursalFinder: SucursalFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const branch: Sucursal = await this.sucursalFinder.run({
        id: new SucursalId(id)
      });

      res.status(200).render('branches/update', {
        branch: branch.toPrimitives()
      });
    } catch (error) {
      if(error instanceof SucursalNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la sucursal'
        });
      }
      
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
