import { Point } from "../../Itinerary/domain/Point";
import { ResponseIsPoint } from "./ResponseIsPoint";
import { ResponsePoint } from "./ResponsePoint";
import { SurveyAnswerQuestion } from "./SurveyAnswerQuestion";
import { SurveyDescription } from "./SurveyDescription";
import { SurveyTitle } from "./SurveyTitle";

export class SurveyResponse {
  public point: ResponsePoint;

  constructor(
    private surveyTitle: SurveyTitle,
    private surveyDescription: SurveyDescription,
    private belongsToPoint: ResponseIsPoint,
    private answers: SurveyAnswerQuestion[]
  ) {}

  setPoint(point: ResponsePoint) {
    this.belongsToPoint = new ResponseIsPoint(true);
    
    this.point = point;
  }

  public formatDate() {
    this.point.itinerarySchedule.format()
  }

  static create(params: {
    surveyTitle: SurveyTitle;
    surveyDescription: SurveyDescription;
    belongsToPoint: ResponseIsPoint;
    answers: SurveyAnswerQuestion[];
  }): SurveyResponse {
    const response = new SurveyResponse(
      params.surveyTitle,
      params.surveyDescription,
      params.belongsToPoint,
      params.answers
    );
    return response;
  }

  static fromPrimitives(params: {
    surveyTitle: string;
    surveyDescription: string;
    belongsToPoint: boolean;
    answers: {
      questionId: string;
      questionText: string;
      questionType: string;
      surveyResponse: string;
    }[];
  }): SurveyResponse {
    return new SurveyResponse(
      new SurveyTitle(params.surveyTitle),
      new SurveyDescription(params.surveyDescription),
      new ResponseIsPoint(params.belongsToPoint),
      params.answers.map((answer) => SurveyAnswerQuestion.fromPrimitives(answer))
    );
  }

  toPrimitives() {
    return {
      surveyTitle: this.surveyTitle.toString(),
      surveyDescription: this.surveyDescription.toString(),
      belongsToPoint: this.belongsToPoint.value,
      answers: this.answers.map((answer) => answer.toPrimitives()),
      point: this.point ? this.point.toPrimitives() : null
    };
  }
}
