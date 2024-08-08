import { SurveyTerminator } from "../../../../../Contexts/Backoffice/Survey/application/Close/SurveyTerminator";
import { Request, Response } from "express";
import { SurveyNotFound } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyNotFound";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";

export class SurveyCloseController {
  constructor(
    private surveyTerminator: SurveyTerminator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.surveyTerminator.run({
        survey: new SurveyId(id)
      });

      res.redirect('/backoffice/survey');
    } catch (error) {
     if(error instanceof SurveyNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la encuesta'
        });
     }

     res.status(500).render('error/error', {
      message: 'Ocurrio un error contacta soporte'
     });
    }
  }
}
