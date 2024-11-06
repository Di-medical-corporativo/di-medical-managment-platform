import { PermitAcceptor } from "../../../../../Contexts/Backoffice/Permit/application/Acept/PermitAcceptor";
import { Request, Response } from "express";
import { PermitNotFound } from "../../../../../Contexts/Backoffice/Permit/domain/PermitNotFound";
import { PermitStatusList } from "../../../../../Contexts/Backoffice/Permit/domain/PermitStatus";
import { PermitAdminComment } from "../../../../../Contexts/Backoffice/Permit/domain/PermitComment";
import { PermitId } from "../../../../../Contexts/Backoffice/Permit/domain/PermitId";

export class PermitAcceptController {
  constructor(
    private permitAcceptor: PermitAcceptor
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { comment } = req.body;

      await this.permitAcceptor.run({
        action: PermitStatusList.Approved,
        comment: new PermitAdminComment(comment),
        id: new PermitId(id)
      });

      res.redirect('/backoffice/permit');
    } catch (error) {
      console.log(error);

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
