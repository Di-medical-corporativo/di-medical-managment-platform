import { Itinerary } from "../../domain/Itinerary";
import { ItineraryFinder } from "../../domain/ItineraryFinder";
import { ItineraryHasActivePoints } from "../../domain/ItineraryHasActivePoints";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryRepository } from "../../domain/ItineraryRepository";

export class ItineraryFinisher {
  private itineraryFinder: ItineraryFinder;

  constructor(
    private repository: ItineraryRepository
  ) {
    this.itineraryFinder = new ItineraryFinder(repository);
  }

  async run(params: {
    id: ItineraryId
  }) {
    const itinerary: Itinerary = await this.itineraryFinder.run({
      id: params.id
    });

    if(itinerary.hasOnGoingPoints()){
      throw new ItineraryHasActivePoints();
    }

    await this.repository.end(params.id);
  }
}
