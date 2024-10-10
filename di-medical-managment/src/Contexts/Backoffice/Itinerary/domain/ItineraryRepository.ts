import { Itinerary } from "./Itinerary";
import { ItineraryId } from "./ItineraryId";
import { ItineraryPreview } from "./ItineraryPreview";
import { Point } from "./Point";
import { PointId } from "./PointId";

export interface ItineraryRepository {
  save(itinerary: Itinerary): Promise<void>
  
  findAll(): Promise<ItineraryPreview[]>

  search(id: ItineraryId): Promise<Itinerary | null>

  start(id: ItineraryId): Promise<void>

  end(id: ItineraryId): Promise<void>

  findPoint(id: PointId): Promise<Point | null>

  endPoint(id: Point): Promise<void>

  addPointsToItinerary(id: ItineraryId, points: Point[]): Promise<void>

  updatePoint(point: Point): Promise<void>
}

