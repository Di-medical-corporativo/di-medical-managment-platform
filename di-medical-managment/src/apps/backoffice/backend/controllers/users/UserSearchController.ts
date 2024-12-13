import { UserFinder } from "../../../../../Contexts/Backoffice/User/domain/UserFinder";
import { Request, Response } from "express";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { SucursalSearcher } from "../../../../../Contexts/Backoffice/Sucursal/application/SearchAll/SucursalSearcher";
import { roles } from "../../../../../Contexts/Shared/domain/roles/Roles";
import { ModuleSearcher } from "../../../../../Contexts/Shared/application/ModuleSearcher";

export class UserSearchController {
  constructor(
    private userFinder: UserFinder,
    private sucursalSearcher: SucursalSearcher,
    private moduleSearcher: ModuleSearcher
  ) {}

  async run (req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const user = await this.userFinder.run(id);

      const sucursals = await this.sucursalSearcher.run();

      const modules = await this.moduleSearcher.run();

      res.status(200).render('users/update', {
        user: user.toPrimitives(),
        sucursals: sucursals.map(s => s.toPrimitives()),
        modules: modules.map(m => m.toPrimitives())
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
