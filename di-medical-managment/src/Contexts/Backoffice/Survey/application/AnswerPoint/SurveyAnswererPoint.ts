import { ItineraryRepository } from "../../../Itinerary/domain/ItineraryRepository";
import { PointFinder } from "../../../Itinerary/domain/PointFinder";
import { PointId } from "../../../Itinerary/domain/PointId";
import { Answer } from "../../domain/Answer";
import { ResponseId } from "../../domain/ResponseId";
import { SurveyClosed } from "../../domain/SurveyClosed";
import { SurveyFinder } from "../../domain/SurveyFinder";
import { SurveyId } from "../../domain/SurveyId";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class SurveyAnswererPoint {
  private surveyFinder: SurveyFinder;

  private pointFinder: PointFinder;
  
  constructor(
    private repository: SurveyRepository,
    private itineraryRepository: ItineraryRepository
  ) {
    this.surveyFinder = new SurveyFinder(repository);

    this.pointFinder = new PointFinder(itineraryRepository);
  }

  async run(params: {
    id: ResponseId,
    surveyId: SurveyId,
    answers: Answer[],
    pointId: PointId
  }) {
    const survey = await this.surveyFinder.run({
      id: params.surveyId
    });

    if(!survey.isAcceptingAnswers()) {
      throw new SurveyClosed();
    }

    const point = await this.pointFinder.run({
      id: params.pointId
    });

  }
}
