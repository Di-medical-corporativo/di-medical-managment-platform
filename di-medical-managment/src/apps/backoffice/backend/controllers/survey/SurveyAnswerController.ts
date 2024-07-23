import { SurveyAnswerer } from "../../../../../Contexts/Backoffice/Survey/application/Answer/SurveyAnswerer";
import e, { Request, Response } from "express";
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

export class SurveyAnswerController {
  constructor(
    private surveyAnswerer: SurveyAnswerer
  ) {}

  async run(req: Request, res: Response) {
   try {
    const { id, surveyId, answers = [] } = req.body;

    const answersDomain = answers.map((a: { 
      id: string;
      answerText?: string;
      questionId: string;
      option?: {
        id: string;
        optionId: string
      };
    }) => {

      if(a.answerText) {
        return AnswerOpen.create({
          id: new AnswerId(a.id), 
          questionId: new QuestionId(a.questionId), 
          answerText: new AnswerText(a.answerText)
        });
      }
      return AnswerMultiple.create({
        id: new AnswerId(a.id),
        questionId: new QuestionId(a.questionId),
        option: AnswerOption.create({
          id: new AnswerOptionId(a.option?.id as string),
          optionId: new OptionId(a.option?.optionId as string)
        })
      });
    });

    await this.surveyAnswerer.run({
      id: new ResponseId(id),
      surveyId: new SurveyId(surveyId),
      answers: answersDomain
    });

    res.sendStatus(201);
   } catch (error) {
    if(error instanceof SurveyNotFound) {
      res.sendStatus(404);
    } else if(error instanceof SurveyClosed) {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
   }
  }
}
