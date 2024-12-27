import { QuestionAnswer } from "./QuestionAnswer";
import { QuestionId } from "./QuestionId";
import { QuestionText } from "./QuestionText";
import { QuestionType } from "./QuestionType";

export class SurveyAnswerQuestion {
  constructor(
    private questionId: QuestionId,
    private questionText: QuestionText,
    private questionType: QuestionType,
    private surveyResponse: QuestionAnswer
  ) {}

  static create(params: {
    questionId: QuestionId;
    questionText: QuestionText;
    questionType: QuestionType;
    surveyResponse: QuestionAnswer;
  }): SurveyAnswerQuestion {
    return new SurveyAnswerQuestion(
      params.questionId,
      params.questionText,
      params.questionType,
      params.surveyResponse
    );
  }

  static fromPrimitives(params: {
    questionId: string;
    questionText: string;
    questionType: string;
    surveyResponse: string;
  }): SurveyAnswerQuestion {
    return new SurveyAnswerQuestion(
      new QuestionId(params.questionId),
      new QuestionText(params.questionText),
      new QuestionType(params.questionType),
      new QuestionAnswer(params.surveyResponse)
    );
  }

  toPrimitives() {
    return {
      questionId: this.questionId.toString(),
      questionText: this.questionText.toString(),
      questionType: this.questionType.toString(),
      surveyResponse: this.surveyResponse.toString()
    };
  }
}
