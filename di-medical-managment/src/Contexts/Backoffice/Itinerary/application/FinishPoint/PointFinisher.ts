import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { PointComment } from "../../domain/PointComment";
import { PointId } from "../../domain/PointId";
import { PointProblem } from "../../domain/PointProblem";

export class PointFinisher {
  constructor(
    private repository: ItineraryRepository
  ) {}

  async run(params: {
    id: PointId,
    comment: PointComment,
    hasProblem: PointProblem
  }) {
    
  }
}
