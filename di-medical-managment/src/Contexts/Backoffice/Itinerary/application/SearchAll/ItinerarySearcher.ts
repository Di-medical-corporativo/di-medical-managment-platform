import { ItineraryPreview } from "../../domain/ItineraryPreview";
import { ItineraryRepository } from "../../domain/ItineraryRepository";

export class ItinerarySearcher {
  constructor(
    private repository: ItineraryRepository
  ) {}

  async run() {
    const itineraries: ItineraryPreview[] = await this.repository.findAll();  
  
    return itineraries;
  }
}
