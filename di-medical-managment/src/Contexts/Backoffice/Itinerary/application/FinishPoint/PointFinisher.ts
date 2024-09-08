import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { Point } from "../../domain/Point";
import { PointComment } from "../../domain/PointComment";
import { PointFinder } from "../../domain/PointFinder";
import { PointId } from "../../domain/PointId";
import { PointProblem } from "../../domain/PointProblem";

export class PointFinisher {
  private pointFinder: PointFinder;
  
  constructor(
    private repository: ItineraryRepository
  ) {
    this.pointFinder = new PointFinder(repository);
  }

  async run(params: {
    id: PointId,
    comment: PointComment,
    hasProblem: PointProblem
  }) {
    const point: Point = await this.pointFinder.run({
      id: params.id
    });

    point.end(
      params.comment,
      params.hasProblem
    );

    await this.repository.endPoint(point);
  }
}
