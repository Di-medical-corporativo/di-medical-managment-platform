import { Request, Response } from "express"
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
import { Survey } from "../../../../../Contexts/Backoffice/Survey/domain/Survey";

export class SurveyCreateController {
  constructor(
    private surveyCreator: SurveyCreator
  ) {}

  async run(req: Request, res: Response) {
    const { id, title, description, questions = [] } = req.body;

    const questionsDomain = questions.map((q: any) => {
      const options: Option[] = [];

      if(q.type == 'multiple') {
        q.options.forEach((o: any) => 
        options.push(Option
          .create({
            id: o.id,
            order: o.order,
            value: o.value
          })
        ));
      }
      
      return Question.create({
          id: new QuestionId(q.id),
          text: new QuestionText(q.text),
          order: new QuestionOrder(q.order),
          type: new QuestionType(q.type),
          options
        });
    });

    const survey = Survey.create({
      id: new SurveyId(id),
      description: new SurveyDescription(description),
      title: new SurveyTitle(title),
      questions: questionsDomain
    });

    console.log(survey, questionsDomain);

    res.sendStatus(201);
  }
}
