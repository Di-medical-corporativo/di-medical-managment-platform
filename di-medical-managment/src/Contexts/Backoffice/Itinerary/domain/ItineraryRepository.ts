import { Itinerary } from "./Itinerary";
import { ItineraryId } from "./ItineraryId";
import { ItineraryPreview } from "./ItineraryPreview";

export interface ItineraryRepository {
  save(itinerary: Itinerary): Promise<void>
  
  findAll(): Promise<ItineraryPreview[]>

  search(id: ItineraryId): Promise<Itinerary | null>

  start(id: ItineraryId): Promise<void>
}
