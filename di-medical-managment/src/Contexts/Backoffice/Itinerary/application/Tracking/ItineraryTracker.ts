import { ItineraryFinder } from "../../domain/ItineraryFinder";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryRepository } from "../../domain/ItineraryRepository";

export class ItineraryTracker {
  private itineraryFinder: ItineraryFinder;
  
  constructor(
    private repository: ItineraryRepository
  ) {
    this.itineraryFinder = new ItineraryFinder(repository);
  }

  async run(params: {
    id: ItineraryId
  }) {
    const itinerary = await this.itineraryFinder.run({
      id: params.id
    });

    return itinerary;
  }
}
