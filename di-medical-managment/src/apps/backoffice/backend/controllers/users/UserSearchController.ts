import { UserFinder } from "../../../../../Contexts/Backoffice/User/domain/UserFinder";
import { Request, Response } from "express";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { SucursalSearcher } from "../../../../../Contexts/Backoffice/Sucursal/application/SearchAll/SucursalSearcher";
import { roles } from "../../../../../Contexts/Shared/domain/roles/Roles";

export class UserSearchController {
  constructor(
    private userFinder: UserFinder,
    private sucursalSearcher: SucursalSearcher
  ) {}

  async run (req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const user = await this.userFinder.run(id);

      const sucursals = await this.sucursalSearcher.run();

      res.status(200).render('users/update', {
        user: user.toPrimitives(),
        roles,
        sucursals: sucursals.map(s => s.toPrimitives())
      });
    } catch (error) {
      if(error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
