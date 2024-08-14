import { SucursalSearcher } from "../../../../../Contexts/Backoffice/Sucursal/application/SearchAll/SucursalSearcher";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { Sucursal } from "../../../../../Contexts/Backoffice/Sucursal/domain/Sucursal";
import { roles } from "../../../../../Contexts/Shared/domain/roles/Roles";

export class UserCreatePageController {
  constructor(
    private sucursalSearcher: SucursalSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const id = uuid();
      
      const sucursals: Sucursal[] = await this.sucursalSearcher.run();

      res.status(200).render('users/create', {
        id,
        sucursals: sucursals.map(s => s.toPrimitives()),
        roles
      })
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
