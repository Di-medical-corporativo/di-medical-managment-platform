import { Either } from '../../shared/domain/Either'
import { PaginatedResult } from '../../shared/domain/PaginatedResult'
import { ServerError } from '../../shared/domain/errors/Error'
import { Itinerary } from '../domain/Itinerary'
import { Point } from '../domain/Point'

export interface ItineraryRepository {
  createItinerary(itinerary: Itinerary): Promise<Either<ServerError, Itinerary>>
  getItineraryPaginated(page: number): Promise<Either<ServerError, PaginatedResult<Itinerary>>>
  getItineraryById(itineraryId: string): Promise<Either<ServerError, Itinerary>>
  getPointById(pointId: string): Promise<Either<ServerError, Point>>
  updatePointById(point: Point): Promise<Either<ServerError, Point>>
  finishItinerary(itinerary: Itinerary): Promise<Either<ServerError, boolean>>
}
