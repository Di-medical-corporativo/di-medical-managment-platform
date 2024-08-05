import { SurveyPreview } from "../../domain/SurveyPreview";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class SurveySearcher {
  constructor(
    private repository: SurveyRepository
  ) {}

  async run() {
    const surveys: SurveyPreview[] = await this.repository.findAll();

    return surveys;
  }
}
