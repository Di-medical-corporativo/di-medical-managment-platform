import { Answer } from "../../domain/Answer";
import { Response } from "../../domain/Response";
import { ResponseId } from "../../domain/ResponseId";
import { SurveyClosed } from "../../domain/SurveyClosed";
import { SurveyFinder } from "../../domain/SurveyFinder";
import { SurveyId } from "../../domain/SurveyId";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class SurveyAnswerer {
  private surveyFinder: SurveyFinder;

  constructor(
    private repository: SurveyRepository
  ) {
    this.surveyFinder = new SurveyFinder(repository);
  }

  async run(params: {
    id: ResponseId,
    surveyId: SurveyId,
    answers: Answer[]
  }) {
    const survey = await this.surveyFinder.run({
      id: params.surveyId
    });

    if(!survey.isAcceptingAnswers()) {
      throw new SurveyClosed();
    }

    const response = Response.create(params);

    await this.repository.answer(response);
  }
}
