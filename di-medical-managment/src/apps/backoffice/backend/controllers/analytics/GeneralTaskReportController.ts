import { Request, Response } from "express";

export class GeneralTaskReportController {
  constructor() {}

  async run(req: Request, res: Response) {
    try {
      const { from, to } = req.body;

      res.status(200).render('analytics/general-report-task', {
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
