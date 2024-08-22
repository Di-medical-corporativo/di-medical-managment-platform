import { SurveyId } from "../../Survey/domain/SurveyId";
import { SurveyTitle } from "../../Survey/domain/SurveyTitle";

export class PointSurvey {
  constructor(
    private id: SurveyId,
    private title: SurveyTitle
  ) {}

  static fromPrimitives(params: {
    id: string;
    title: string;
  }) {
    return new PointSurvey(
      new SurveyId(params.id),
      new SurveyTitle(params.title)
    );
  }

  static create(params: {
    id: SurveyId,
    title: SurveyTitle
  }) {
    return new PointSurvey(
      params.id,
      params.title
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.title.toString()
    }
  }
}
