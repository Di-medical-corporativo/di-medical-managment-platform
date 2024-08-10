import { QuestionResult } from "./QuestionResult";
import { SurveyId } from "./SurveyId";
import { SurveyTotalAnswers } from "./SurveyTotalAnswers";

export class SurveyResult {
  constructor(
    private id: SurveyId,
    private totalAnswers: SurveyTotalAnswers,
    private results: QuestionResult[]
  ) {}

  static create(params: {
    id: SurveyId,
    total: SurveyTotalAnswers
    results: QuestionResult[]
  }) {
    return new SurveyResult(
      params.id,
      params.total,
      params.results
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      total: this.totalAnswers.value,
      results: this.results.map(r => r.toPrimitives())
    }
  }
}
