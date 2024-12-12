import { ModuleCreator } from "../../../../../Contexts/Shared/application/ModuleCreator";
import { Request, Response } from "express";
import { ModuleId } from "../../../../../Contexts/Shared/domain/ModuleId";
import { ModuleName } from "../../../../../Contexts/Shared/domain/ModuleName";

export class ModuleCreateController {
  constructor(
    private moduleCreator: ModuleCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      await this.moduleCreator.run({
        id: new ModuleId(id),
        name: new ModuleName(name)
      })

      res.redirect('/backoffice/modules');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta con soporte'
      });
    }
  }
}
