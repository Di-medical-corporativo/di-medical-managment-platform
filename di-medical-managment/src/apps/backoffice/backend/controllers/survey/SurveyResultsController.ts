import { SurveyResultsDisplayer } from "../../../../../Contexts/Backoffice/Survey/application/Results/SurveyResultsDisplayer";
import { Request, Response } from "express";
import { SurveyResult } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyResult";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyNotFound } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyNotFound";

export class SurveyResultsController {
  constructor(
    private surveyResultsDisplayer: SurveyResultsDisplayer
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const surveyResult: SurveyResult = await this.surveyResultsDisplayer.run({
        id: new SurveyId(id)
      });

      res.status(200).render('surveys/result', {
        result: surveyResult.toPrimitives()
      });
    } catch (error) {
      if(error instanceof SurveyNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la encuesta'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
