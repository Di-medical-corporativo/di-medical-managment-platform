import { ItineraryRepository } from "../../../Itinerary/domain/ItineraryRepository";
import { Point } from "../../../Itinerary/domain/Point";
import { PointFinder } from "../../../Itinerary/domain/PointFinder";
import { PointId } from "../../../Itinerary/domain/PointId";
import { Answer } from "../../domain/Answer";
import { Response } from "../../domain/Response";
import { ResponseId } from "../../domain/ResponseId";
import { Survey } from "../../domain/Survey";
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
    const survey: Survey = await this.surveyFinder.run({
      id: params.surveyId
    });

    if(!survey.isAcceptingAnswers()) {
      throw new SurveyClosed();
    }

    const point: Point = await this.pointFinder.run({
      id: params.pointId
    });

    const response: Response = Response.create({
      answers: params.answers,
      id: params.id,
      surveyId: params.surveyId
    });

    await this.repository.answerPoint(
      response,
      params.pointId
    );
  }
}
