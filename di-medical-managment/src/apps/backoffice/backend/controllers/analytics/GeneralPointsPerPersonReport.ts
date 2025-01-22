import { Request, Response } from "express";
import { PointGeneralReporter } from "../../../../../Contexts/Backoffice/Analytics/application/PointGeneral/PointGeneralReporter";
import { ToDate } from "../../../../../Contexts/Backoffice/Analytics/domain/ToDate";
import { FromDate } from "../../../../../Contexts/Backoffice/Analytics/domain/FromDate";

export class GeneralPointsPerPersonReport {
  constructor(
    private pointGeneralReporter: PointGeneralReporter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { from, to } = req.body;

      const report = await this.pointGeneralReporter.run({
        from: new FromDate(new Date(from)),
        to: new ToDate(new Date(to))
      });

      res.status(200).render('analytics/general-report-points-person', {
        from,
        to,
        report
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
