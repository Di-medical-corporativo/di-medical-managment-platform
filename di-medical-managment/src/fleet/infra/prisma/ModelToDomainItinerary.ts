import { Itinerary } from '@prisma/client'
import { Itinerary as DomainItinerary } from '../../domain/Itinerary'
import { ModelToDomainSucursal } from './ModelToDomainSucursal';
import { ModelToDomainPoint } from './ModelToDomainPoint';


export class ModelTodomainItinerary {
  public static from(itinerary: { 
    scheduleDate: Date;
    sucursal: { 
      id: string; 
      name: string; 
      address: string; 
      phone: string; 
      dimedicalBrand: string; 
    }; 
    points: (
      { 
        comment: string | null;
        user: 
        { 
          id: string; 
          firstName: string; 
          lastName: string; 
          birthDate: Date; 
          NSS: string; 
          job: string; 
          picture: string; 
          phone: string; 
          email: string; 
          isActive: boolean; 
          createdAt: Date; 
          updatedAt: Date; 
          loginId: string | null; 
          sucursalId: string; 
        }; 
        client: 
        { 
          id: string; 
          name: string; 
          address: string; 
          isActive: boolean; 
        }; 
        truck: 
        { 
          id: string; 
          plates: string; 
          model: string; 
          brand: string; 
          picture: string; 
          isActive: boolean; 
        }; 
        invoices: 
        { 
          invoceId: string; 
          invoiceNumber: string; 
          description: string | null; 
          pointId: string; 
        }[]; 
        }
         & 
         { 
          id: string; 
          sign: string | null; 
          clientId: string; 
          truckId: string; 
          userId: string; 
          itineraryId: string | null; 
          comment: string | null
        })[]; 
      } & 
      { 
        id: string; 
        sucursalId: string; 
        createdAt: Date; 
        updatedAt: Date;
        scheduleDate: Date;
      }) {
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
