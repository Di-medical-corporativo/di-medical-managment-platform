import { Request, Response } from "express";
import { IssueSearcher } from "../../../../../Contexts/Backoffice/Attendance/application/SearchAll/IssueSearcher";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { AttendanceIssue } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceIssue";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { IssuesOverviewer } from "../../../../../Contexts/Backoffice/Attendance/application/Overview/IssuesOverviewer";

export class AttendanceIssuePageController {
  constructor(
    private issueSearcher: IssueSearcher,
    private issueOverviewer: IssuesOverviewer
  ) { }

  async run(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const overview = await this.issueOverviewer.run({
        userId: new UserId(userId)
      });

      const issues: AttendanceIssue[] = await this.issueSearcher.run({
        userId: new UserId(userId)
      });

      const issuesPrimitives = issues.map(i => i.toPrimitives());

      res.status(200).render('attendance/admin-issue', {
        issues: issuesPrimitives,
        userId,
        overview
      });
    } catch (error) {
      console.log(error);
      if (error instanceof UserNotFound) {
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
