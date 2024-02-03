import { Itinerary } from '@prisma/client'
import { Itinerary as DomainItinerary } from '../../domain/Itinerary'
import { ModelToDomainSucursal } from './ModelToDomainSucursal';
import { ModelToDomainPoint } from './ModelToDomainPoint';


export class ModelTodomainItinerary {
  public static from(itinerary: any) {
    const itineraryDomain = new DomainItinerary(
      itinerary.id,
      itinerary.createdAt,
      itinerary.updatedAt,
      itinerary.scheduleDate
    )

    itineraryDomain.points = ModelToDomainPoint.fromPoints(itinerary.points)
    return itineraryDomain
  }

  public static fromItineraries(itineraries: any[]) {
    const itinerariesDomain = itineraries.map((itinerary) => {
      const domainItinerary = new DomainItinerary(
        itinerary.id,
        itinerary.createdAt,
        itinerary.updatedAt,
        itinerary.scheduleDate
      )
      domainItinerary.done = itinerary.done
      domainItinerary.totalPoints = itinerary._count.points
      return domainItinerary
    })
    
    return itinerariesDomain
  }
}
