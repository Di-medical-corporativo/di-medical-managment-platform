import { Request, Response } from "express";
import { IssueSearcher } from "../../../../../Contexts/Backoffice/Attendance/application/SearchAll/IssueSearcher";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { AttendanceIssue } from "../../../../../Contexts/Backoffice/Attendance/domain/AttendanceIssue";
import { IssuesOverviewer } from "../../../../../Contexts/Backoffice/Attendance/application/Overview/IssuesOverviewer";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  modules: { id: string; name: string }[];
}

export class AttendanceUserIssueController {
  constructor(
    private issueSearcher: IssueSearcher,
    private issueOverviewer: IssuesOverviewer
  ) { }

  async run(req: Request, res: Response) {
    try {

      const user = req.user as (User | undefined);

      if (!user) {
        res.status(400).redirect('/login');

        return;
      }

      const overview = await this.issueOverviewer.run({
        userId: new UserId(user.id)
      });

      const issues: AttendanceIssue[] = await this.issueSearcher.run({
        userId: new UserId(user.id),
      });

      const issuesPrimitives = issues.map(i => i.toPrimitives());

      res.status(200).render('attendance/user-issue', {
        issues: issuesPrimitives,
        overview
      });
    } catch (error) {
      console.log(error)

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
