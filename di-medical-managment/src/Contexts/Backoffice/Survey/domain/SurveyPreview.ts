import { SurveyDescription } from "./SurveyDescription";
  import { SurveyId } from "./SurveyId";
import { SurveyIsActive } from "./SurveyIsActive";
import { SurveyTitle } from "./SurveyTitle";
import { SurveyTotalAnswers } from "./SurveyTotalAnswers";

export class SurveyPreview {
  constructor(
    private id: SurveyId,
    private title: SurveyTitle,
    private description: SurveyDescription,
    private totalAnswers: SurveyTotalAnswers,
    private isActive: SurveyIsActive
  ) {}

  static create(params: {
    id: SurveyId,
    title: SurveyTitle,
    description: SurveyDescription,
    totalAnswers: SurveyTotalAnswers,
    isActive: SurveyIsActive
  }) {
    return new SurveyPreview(
      params.id,
      params.title,
      params.description,
      params.totalAnswers,
      params.isActive
    );
  }

  static fromPrimitives(params: {
    id: string;
    title: string;
    description: string;
    totalAnswers: number;
    isActive: boolean;
  }) {
    return new SurveyPreview(
      new SurveyId(params.id),
      new SurveyTitle(params.title),
      new SurveyDescription(params.description),
      new SurveyTotalAnswers(params.totalAnswers),
      new SurveyIsActive(params.isActive)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.title.toString(),
      description: this.description.toString(),
      totalAnswers: this.totalAnswers.value,
      isActive: this.isActive.value
    }
  }
}
