import { SurveyClosed } from "./SurveyClosed";
import { SurveyId } from "./SurveyId";
import { SurveyNotFound } from "./SurveyNotFound";
import { SurveyRepository } from "./SurveyRepository";

export class SurveyFinder {
  constructor(
    private repository: SurveyRepository
  ) {}

  async run(params: {
    id: SurveyId
  }) {
    const survey = await this.repository.search(params.id);

    if(survey === null) {
      throw new SurveyNotFound(); 
    }

    if(!survey.isAcceptingAnswers()) {
      throw new SurveyClosed();
    }

    return survey;
  }
}
