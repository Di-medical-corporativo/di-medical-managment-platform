import { SurveyFinder } from "../../domain/SurveyFinder";
import { SurveyId } from "../../domain/SurveyId";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class SurveyTerminator {
  private surveyFinder: SurveyFinder
  constructor(
    private repository: SurveyRepository
  ) {
    this.surveyFinder = new SurveyFinder(repository);
  }

  async run(params: { survey: SurveyId }) {
    await this.ensureSurveyExits(params.survey);

    await this.repository.close(params.survey);
  }

  private async ensureSurveyExits(id: SurveyId) {
    await this.surveyFinder.run({
      id
    });
  }
}
