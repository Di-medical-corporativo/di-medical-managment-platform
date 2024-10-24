import { ItineraryPreview } from "../../domain/ItineraryPreview";
import { ItineraryRepository } from "../../domain/ItineraryRepository";

export class ItinerarySearcher {
  constructor(
    private repository: ItineraryRepository
  ) {}

  async run(params: {
    month: number,
    year: number
  }) {
    const itineraries: ItineraryPreview[] = await this.repository.findAll(
      params.month,
      params.year
    ); 
  
    return itineraries;
  }
}
