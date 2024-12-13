import { v4 as uuid } from "uuid";
import { SucursalSearcher } from "../../../../../Contexts/Backoffice/Sucursal/application/SearchAll/SucursalSearcher";
import { Request, Response } from "express";
import { Sucursal } from "../../../../../Contexts/Backoffice/Sucursal/domain/Sucursal";
import { ModuleSearcher } from "../../../../../Contexts/Shared/application/ModuleSearcher";
import { Module } from "../../../../../Contexts/Shared/domain/Module";

export class UserCreatePageController {
  constructor(
    private sucursalSearcher: SucursalSearcher,
    private moduleSearcher: ModuleSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const id = uuid();
      
      const sucursals: Sucursal[] = await this.sucursalSearcher.run();

      const modules: Module[] = await this.moduleSearcher.run();

      res.status(200).render('users/create', {
        id,
        sucursals: sucursals.map(s => s.toPrimitives()),
        modules: modules.map(m => m.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
