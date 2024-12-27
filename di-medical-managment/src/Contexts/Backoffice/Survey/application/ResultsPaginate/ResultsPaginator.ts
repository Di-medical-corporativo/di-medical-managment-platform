import { SurveyId } from "../../domain/SurveyId";
import { SurveyRepository } from "../../domain/SurveyRepository";
import { SurveyResponse } from "../../domain/SurveyResponse";

export class ResultsPaginator {
  constructor(
    private repository: SurveyRepository
  ) {}

  async run(params: {
    surveyId: SurveyId,
    position: number
  }): Promise<{ answer: SurveyResponse[], total: number  }> {
    const { answers, total } = await this.repository.resultsPaginated(
      params.surveyId,
      params.position
    );

    return { answer: answers, total };
  }
}
