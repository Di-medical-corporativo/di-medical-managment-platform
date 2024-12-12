import { Request, Response } from "express";
import { ModuleSearcher } from "../../../../../Contexts/Shared/application/ModuleSearcher";

export class ModuleFindAllController {
  constructor(
    private moduleSearcher: ModuleSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const modules = await this.moduleSearcher.run();

      res.status(200).render('modules/main', {
        modules: modules.map(m => m.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
