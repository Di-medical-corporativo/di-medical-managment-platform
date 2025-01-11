import { Request, Response } from "express";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { JustificationNotFound } from "../../../../../Contexts/Backoffice/Attendance/domain/JustificationNotFound";
import { JustificationActionTaker } from "../../../../../Contexts/Backoffice/Attendance/application/Action/JustificationActionTaker";
import { JustificationStatus } from "../../../../../Contexts/Backoffice/Attendance/domain/JustificationStatus";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { JustificationId } from "../../../../../Contexts/Backoffice/Attendance/domain/JustificationId";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  modules: { id: string; name: string }[];
}

export class AttendanceJustificationAction {
  constructor(
    private justificationTaker: JustificationActionTaker
  ) { }

  async run(req: Request, res: Response) {
    try {
      const user = req.user as (User | undefined);

      if (!user) {
        res.status(400).redirect('/login');

        return;
      }

      const { action } = req.body;
      
      const { justificationId } = req.params;

      await this.justificationTaker.run({
        action: new JustificationStatus(action),
        approverId: new UserId(user.id),
        justificantId: new JustificationId(justificationId)
      });

      res.redirect('/backoffice/attendance');
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario seleccionado'
        });
      } else if (error instanceof JustificationNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la justificion'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
