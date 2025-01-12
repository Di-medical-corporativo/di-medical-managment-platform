import { Request, Response } from "express";
import { AttendanceJustifier } from "../../../../../Contexts/Backoffice/Attendance/application/Justify/AttendanceJustifier";
import { AttendanceNotFound } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceNotFound";
import { JustificationId } from "../../../../../Contexts/Backoffice/Attendance/domain/JustificationId";
import { JustificationReason } from "../../../../../Contexts/Backoffice/Attendance/domain/JustificationReason";
import { AttendanceId } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceId";

export class AttendanceJustifyController {
  constructor(
    private attendanceJustifier: AttendanceJustifier
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { reason, id } = req.body;

      const { issueId } = req.params;
      
      await this.attendanceJustifier.run({
        issueId: new AttendanceId(issueId),
        justificationId: new JustificationId(id),
        reason: new JustificationReason(reason)
      });

      res.redirect('/backoffice/attendance/myhistory');
    } catch (error) {
      if(error instanceof AttendanceNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la falta/retardo'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
