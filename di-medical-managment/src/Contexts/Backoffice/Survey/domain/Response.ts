import { Answer, AnswerMultiple, AnswerOpen } from "./Answer";
import { ResponseId } from "./ResponseId";
import { SurveyId } from "./SurveyId";

export class Response {
  constructor(
    private id: ResponseId,
    private surveyId: SurveyId,
    private answers: Answer[]
  ) {}

  static fromPrimitives(params: {
    id: string;
    surveyId: string;
    answers: {
      id: string;
      question: string;
      answerText?: string;
      option?: { id: string; optionId:string; };
    }[];
  }) {
    let answers = params.answers.map(a => {
      if(a.answerText) {
        return AnswerOpen.fromPrimitives({
          id: a.id,
          answerText: a.answerText,
          questionId: '',
          question: a.question
        });
      }

      return AnswerMultiple.fromPrimitives({
        id: a.id,
        questionId: '',
        option: {
          id: a.option?.id!,
          optionId: a.option?.optionId!
        },
        question: a.question
      });
    });

    return new Response(
      new ResponseId(params.id),
      new SurveyId(params.surveyId),
      answers
    );
  }

  static create(params: {
    id: ResponseId,
    surveyId: SurveyId,
    answers: Answer[]
  }) {
    return new Response(
      params.id,
      params.surveyId,
      params.answers
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      surveyId: this.surveyId.toString(),
      answers: this.answers.map(a => a.toPrimitives())
    }
  }
}
