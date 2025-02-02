import { Request, Response } from "express";
import { IssueRemover } from "../../../../../Contexts/Backoffice/Attendance/application/Delete/IssueRemover";
import { AttendanceNotFound } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceNotFound";
import { AttendanceId } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceId";

export class AttendanceDeleteController {
  constructor(
    private issueDeleter: IssueRemover
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, userId } = req.body;

      await this.issueDeleter.run({
        id: new AttendanceId(id)
      });

      res.redirect(`/backoffice/attendance/${userId}/history`);
    } catch (error) {
      if(error instanceof AttendanceNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el incidente'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
