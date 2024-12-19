import { Request, Response } from "express";
import { ResponseId } from "../../../../../Contexts/Backoffice/Survey/domain/ResponseId";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";
import { AnswerMultiple, AnswerOpen } from "../../../../../Contexts/Backoffice/Survey/domain/Answer";
import { AnswerId } from "../../../../../Contexts/Backoffice/Survey/domain/AnswerId";
import { QuestionId } from "../../../../../Contexts/Backoffice/Survey/domain/QuestionId";
import { AnswerText } from "../../../../../Contexts/Backoffice/Survey/domain/AnswerText";
import { AnswerOption } from "../../../../../Contexts/Backoffice/Survey/domain/AnswerOption";
import { AnswerOptionId } from "../../../../../Contexts/Backoffice/Survey/domain/AnswerOptionId";
import { OptionId } from "../../../../../Contexts/Backoffice/Survey/domain/OptionId";
import { SurveyNotFound } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyNotFound";
import { SurveyClosed } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyClosed";
import { v4 as uuid } from "uuid";
import { SurveyAnswererPoint } from "../../../../../Contexts/Backoffice/Survey/application/AnswerPoint/SurveyAnswererPoint";
import { PointId } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointId";
import { PointNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointNotFound";

export class SurveyAnswerPointController {
  constructor(
    private surveyAnswerer: SurveyAnswererPoint
  ) {}

  async run(req: Request, res: Response) {
   try {
    const { pointId } = req.params;

    const { surveyId, answers = [] } = req.body;

    const answersDomain = answers.map((a: { 
      id: string;
      answerText?: string;
      questionId: string;
      optionId?: string
    }) => {
      if(a.answerText) {
        return AnswerOpen.create({
          id: new AnswerId(uuid()), 
          questionId: new QuestionId(a.questionId), 
          answerText: new AnswerText(a.answerText)
        });
      }
      return AnswerMultiple.create({
        id: new AnswerId(uuid()),
        questionId: new QuestionId(a.questionId),
        option: AnswerOption.create({
          id: new AnswerOptionId(uuid()),
          optionId: new OptionId(a.optionId as string)
        })
      });
    });

    await this.surveyAnswerer.run({
      id: new ResponseId(uuid()),
      surveyId: new SurveyId(surveyId),
      answers: answersDomain,
      pointId: new PointId(pointId)
    });

    res.redirect('/backoffice/survey/thx');
   } catch (error) {
    if(error instanceof SurveyNotFound) {
      res.status(404).render('error/error', {
        message: 'No se encontro la encuesta'
      });
    } else if(error instanceof SurveyClosed) {
      res.status(400).render('error/error', {
        message: 'La encuesta no recibe mas respuestas'
      });
    } else if(error instanceof PointNotFound) {
      res.status(404).render('error/error', {
        message: 'No se encontro el punto'
      });
    } else {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
   }
  }
}
