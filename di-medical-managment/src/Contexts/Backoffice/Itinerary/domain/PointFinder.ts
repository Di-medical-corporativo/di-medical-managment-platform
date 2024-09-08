import { ItineraryRepository } from "./ItineraryRepository";
import { PointId } from "./PointId";
import { PointNotFound } from "./PointNotFound";

export class PointFinder {
  constructor(
    private repository: ItineraryRepository
  ) {}

  async run(params: {
    id: PointId
  }) {
    const point = await this.repository.findPoint(params.id);

    if(point === null) {
      throw new PointNotFound();
    }

    return point;
  }
}
