import { Request, Response } from "express";
import { SurveySearcher } from "../../../../../Contexts/Backoffice/Survey/application/SearchAll/SurveySearcher";


export class SurveyFindAllController {
  constructor(
    private surveySearcher: SurveySearcher
  ) {}
  
  async run (req: Request, res: Response) {
    try {
      const surveys = await this.surveySearcher.run();

      res.status(200).render('surveys/main', {
        surveys: surveys.map(s => s.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
