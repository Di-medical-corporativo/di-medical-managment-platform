import { ItineraryId } from "./ItineraryId";
import { ItineraryNotFound } from "./ItineraryNotFound";
import { ItineraryRepository } from "./ItineraryRepository";

export class ItineraryFinder {
  constructor(
    private repository: ItineraryRepository
  ) {}

  async run(params: {
    id: ItineraryId
  }) {
    const itinerary = await this.repository.search(params.id);
  
    if(itinerary == null) {
      throw new ItineraryNotFound();
    }

    return itinerary;
  }
}
