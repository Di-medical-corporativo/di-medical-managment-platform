import { Request, Response } from "express";
import { IssueCreator } from "../../../../../Contexts/Backoffice/Attendance/application/CreateIssue/IssueCreator";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { AttendanceDate } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceDate";
import { AttendanceId } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceId";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { AttendanceType } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceType";

export class AttendanceCreateController {
  constructor(
    private issueCreator: IssueCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, userId, date, type } = req.body;

      const isoDate = new Date(date).toISOString();

      await this.issueCreator.run({
        date: new AttendanceDate(isoDate),
        id: new AttendanceId(id),
        issueUser: new UserId(userId),
        type: type as AttendanceType
      });

      res.status(201).redirect('/backoffice/attendance');
    } catch (error) {
      if(error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario seleccionado'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
