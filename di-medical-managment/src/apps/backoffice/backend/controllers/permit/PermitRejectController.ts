import { PermitAcceptor } from "../../../../../Contexts/Backoffice/Permit/application/Acept/PermitAcceptor";
import { Request, Response } from "express";
import { PermitNotFound } from "../../../../../Contexts/Backoffice/Permit/domain/PermitNotFound";
import { PermitStatusList } from "../../../../../Contexts/Backoffice/Permit/domain/PermitStatus";
import { PermitAdminComment } from "../../../../../Contexts/Backoffice/Permit/domain/PermitComment";
import { PermitId } from "../../../../../Contexts/Backoffice/Permit/domain/PermitId";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  modules: { id: string; name: string }[];
}

export class PermitRejectController {
  constructor(
    private permitAcceptor: PermitAcceptor
  ) { }

  async run(req: Request, res: Response) {
    try {
      const user = req.user as (User | undefined);

      if (!user) {
        res.status(400).redirect('/login');

        return;
      }

      const { id } = req.params;

      const { comment } = req.body;

      await this.permitAcceptor.run({
        action: PermitStatusList.Rejected,
        comment: new PermitAdminComment(comment),
        id: new PermitId(id),
        decitionTakenBy: new UserId(user.id)
      });

      res.redirect('/backoffice/permit');
    } catch (error) {
      if (error instanceof PermitNotFound) {
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
