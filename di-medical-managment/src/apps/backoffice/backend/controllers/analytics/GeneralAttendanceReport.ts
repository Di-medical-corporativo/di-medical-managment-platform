import { Request, Response } from "express";
import { AttendanceGeneralReporter } from "../../../../../Contexts/Backoffice/Analytics/application/AttendanceGeneral/AttendanceGeneralReporter";
import { FromDate } from "../../../../../Contexts/Backoffice/Analytics/domain/FromDate";
import { ToDate } from "../../../../../Contexts/Backoffice/Analytics/domain/ToDate";

export class GeneralAttendanceReport {
  constructor(
    private generalAttendanceReporter: AttendanceGeneralReporter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { from, to } = req.body;

      const report = await this.generalAttendanceReporter.run({
        from: new FromDate(new Date(from)),
        to: new ToDate(new Date(to))
      });

      res.status(200).render('analytics/general-report-attendance', {
        report,
        from,
        to
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
