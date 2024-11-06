import { SurveyFinder } from "../../domain/SurveyFinder";
import { SurveyId } from "../../domain/SurveyId";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class SurveyOpener {
  private surveyFinder: SurveyFinder;
  
  constructor(
    private repository: SurveyRepository
  ) {
    this.surveyFinder = new SurveyFinder(repository);
  }

  async run(params: {
    id: SurveyId
  }) {
    await this.ensureSurveyExists(params.id);

    await this.repository.open(params.id);
  }

  async ensureSurveyExists(surveyId: SurveyId) {
    await this.surveyFinder.run({
      id: surveyId
    });
  } 
}
