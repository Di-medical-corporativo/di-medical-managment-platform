import { Itinerary } from "./Itinerary";

export interface ItineraryRepository {
  save(itinerary: Itinerary): Promise<void>
}
