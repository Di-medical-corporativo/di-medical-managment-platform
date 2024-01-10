import { Either } from '../../shared/domain/Either'
import { PaginatedResult } from '../../shared/domain/PaginatedResult'
import { ServerError } from '../../shared/domain/errors/Error'
import { Itinerary } from '../domain/Itinerary'

export interface ItineraryRepository {
  createItinerary(itinerary: Itinerary): Promise<Either<ServerError, Itinerary>>
  getItineraryPaginated(page: number): Promise<Either<ServerError, PaginatedResult<Itinerary>>> 
}
