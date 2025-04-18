import { Request, Response } from "express";
import { TaskGeneralReporter } from "../../../../../Contexts/Backoffice/Analytics/application/TaskGeneral/TaskGeneralReporter";
import { FromDate } from "../../../../../Contexts/Backoffice/Analytics/domain/FromDate";
import { ToDate } from "../../../../../Contexts/Backoffice/Analytics/domain/ToDate";

export class GeneralTaskReportController {
  constructor(
    private taskGeneralReporter: TaskGeneralReporter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { from, to } = req.body;

      const report = await this.taskGeneralReporter.run({
        from: new FromDate(new Date(from)),
        to: new ToDate(new Date(to))
      });

      res.status(200).render('analytics/general-report-task', {
        from,
        to,
        report: report
      });
    } catch (error) {
      console.log(error);
      
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
