import { Request, Response } from "express";
import { SurveyCreator } from "../../../../../Contexts/Backoffice/Survey/application/Create/SurveyCreator";
import { Question } from "../../../../../Contexts/Backoffice/Survey/domain/Question";
import { SurveyDescription } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyDescription";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyTitle } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyTitle";
import { QuestionId } from "../../../../../Contexts/Backoffice/Survey/domain/QuestionId";
import { QuestionText } from "../../../../../Contexts/Backoffice/Survey/domain/QuestionText";
import { QuestionOrder } from "../../../../../Contexts/Backoffice/Survey/domain/QuestionOrder";
import { QuestionType } from "../../../../../Contexts/Backoffice/Survey/domain/QuestionType";
import { Option } from "../../../../../Contexts/Backoffice/Survey/domain/Option";
import { OptionId } from "../../../../../Contexts/Backoffice/Survey/domain/OptionId";
import { OptionOrder } from "../../../../../Contexts/Backoffice/Survey/domain/OptionOrder";
import { OptionValue } from "../../../../../Contexts/Backoffice/Survey/domain/OptionValue";

export class SurveyCreateController {
  constructor(
    private surveyCreator: SurveyCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, title, description, questions = [] } = req.body;

    const questionsDomain = questions.map((q: any) => {
      const options: Option[] = [];

      if(q.type == 'multiple') {
        q.options.forEach((o: any) => 
        options.push(Option
          .create({
            id: new OptionId(o.id),
            order: new OptionOrder(parseInt(o.order)),
            value: new OptionValue(o.value)
          })
        ));
      }
      
      return Question.create({
          id: new QuestionId(q.id),
          text: new QuestionText(q.text),
          order: new QuestionOrder(parseInt(q.order)),
          type: new QuestionType(q.type),
          options
        });
    });

    await this.surveyCreator.run({
      id: new SurveyId(id),
      description: new SurveyDescription(description),
      title: new SurveyTitle(title),
      questions: questionsDomain
    });

    res.redirect('/backoffice/survey');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
