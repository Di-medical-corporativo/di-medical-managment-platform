import { Request, Response } from "express";
import { PermitNotFound } from "../../../../../Contexts/Backoffice/Permit/domain/PermitNotFound";
import { PermitFinder } from "../../../../../Contexts/Backoffice/Permit/domain/PermitFinder";
import { PermitId } from "../../../../../Contexts/Backoffice/Permit/domain/PermitId";

export class PermitAcceptPageController {
  constructor(
    private permitFinder: PermitFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const permit = await this.permitFinder.run({
         id: new PermitId(id)
      });

      res.status(200).render('permit/accept', {
        permit: permit.toPrimitives()
      });
    } catch (error) {
      if(error instanceof PermitNotFound) {
        res.status(404).render('error/error', {
          message: 'Permiso no encontrado'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contaca soporte'
      });
    }
  }
}
