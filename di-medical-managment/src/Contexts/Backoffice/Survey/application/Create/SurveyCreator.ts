import { SurveyDescription } from "../../domain/SurveyDescription";
import { SurveyId } from "../../domain/SurveyId";
import { SurveyIsActive } from "../../domain/SurveyIsActive";
import { SurveyRepository } from "../../domain/SurveyRepository";
import { SurveyTitle } from "../../domain/SurveyTitle";
import { Survey } from "../../domain/Survey";
import { Question } from "../../domain/Question";

export class SurveyCreator {
  constructor(
    private repository: SurveyRepository
  ) {}

  async run(params: {
    id: SurveyId,
    title: SurveyTitle,
    description: SurveyDescription,
    questions: Question[]
  }) {
    const survey = Survey.create(params);

    await this.repository.save(survey);
  }
}
