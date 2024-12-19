import { SurveyClosed } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyClosed";
import { SurveyFinder } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyFinder";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyNotFound } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyNotFound";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export class SurveyAnswerPointPageController {
  constructor(
    private surveyFinder: SurveyFinder
  ) {}

  async run (req: Request, res: Response) {
    try {
      const { id, pointId } = req.params;

      const survey = await this.surveyFinder.run({
        id: new SurveyId(id)
      });

      const answerId = uuid();

      res.status(200).render('surveys/answer-point', {
        survey: survey.toPrimitives(),
        id: answerId,
        pointId
      });
    } catch (error) {
      if(error instanceof SurveyNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la encuesta'
        });
      }

      if(error instanceof SurveyClosed) {
        res.status(400).render('error/error', {
          message: 'La encuesta ya no recibe mas respuestas'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
