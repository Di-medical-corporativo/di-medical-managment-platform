import e, { Request, Response } from "express";
import { PermitDeleter } from "../../../../../Contexts/Backoffice/Permit/application/Delete/PermitDeleter";
import { PermitNotFound } from "../../../../../Contexts/Backoffice/Permit/domain/PermitNotFound";
import { PermitId } from "../../../../../Contexts/Backoffice/Permit/domain/PermitId";

export class PermitDeleteController {
  constructor(
    private permitDeleter: PermitDeleter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.permitDeleter.run({
        id: new PermitId(id)
      });

      res.redirect('/backoffice/permit');
    } catch (error) {
      if(error instanceof PermitNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el permiso'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
