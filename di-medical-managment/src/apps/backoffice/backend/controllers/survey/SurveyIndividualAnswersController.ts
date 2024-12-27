import { ResultsPaginator } from "../../../../../Contexts/Backoffice/Survey/application/ResultsPaginate/ResultsPaginator";
import { Request, Response } from "express";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";
import { EmptySurvey } from "../../../../../Contexts/Backoffice/Survey/domain/EmptySurvey";

export class SurveyIndividualAnswersController {
  constructor(
    private resultsPaginator: ResultsPaginator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { position = 1 } = req.query;

      let currentAnswer = Number(position);
      
      const { answer, total } = await this.resultsPaginator.run({
        surveyId: new SurveyId(id),
        position: currentAnswer
      });
      
      if(total == 0 || answer.length == 0) {
        throw new EmptySurvey();
      }

      const prevAnswer = currentAnswer > 1 ? currentAnswer - 1 : 1;
      const nextAnswer = currentAnswer < total ? currentAnswer + 1 : total;
      
      res.status(200).render('surveys/individual', {
        answer: answer[0].toPrimitives(),
        total,
        prevAnswer,
        nextAnswer,
        id,
        position
      });
    } catch (error) {
      console.log(error);
      if(error instanceof EmptySurvey) {
        res.status(400).render('error/error', {
          message: 'La encuesta aun no tiene suficientes respuestas'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }

    }
  }
}
