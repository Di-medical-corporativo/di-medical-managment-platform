import { SurveyId } from "../../domain/SurveyId";
import { SurveyNotFound } from "../../domain/SurveyNotFound";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class SurveyResultsDisplayer {
  constructor(
    private repository: SurveyRepository
  ) {}

  async run(params: {
    id: SurveyId
  }) {
    const surveyResult = await this.repository.results(params.id);

    if(surveyResult === null) {
      throw new SurveyNotFound();
    }

    return surveyResult;
  }
}
