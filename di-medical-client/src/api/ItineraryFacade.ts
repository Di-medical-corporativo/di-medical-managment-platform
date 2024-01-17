import { AxiosError } from "axios";
import { api } from "src/boot/axios";
import { Either, Left, Right } from "src/entities/Either";
import { Itinerary } from "src/entities/Itinerary";
import { PaginatedResult } from "src/entities/PaginatedResult";
import { Point } from "src/entities/Point";

export interface ItineraryFacadeI {
  registerItinerary(itinerary: Itinerary): Promise<Either<string, Itinerary>>
  getItineraryPaginated(page: number): Promise<Either<string, PaginatedResult<Itinerary>>>
}

export class ItineraryFacade implements ItineraryFacadeI {
  async registerItinerary(itinerary: Itinerary): Promise<Either<string, Itinerary>> {
    try {
      const { data } = await api.post('/itinerary/new', {
        sucursalId: itinerary.sucursal.id,
        scheduleDate: itinerary.scheduleDate,
        points: itinerary.points.map((point) => {
          const pointToCreate: any = {
            clientId: point.client.clientId,
            truckId: point.truck.truckId,
            assignedUserId: point.assignedDriver.userId,
            invoices: point.invoices.map((inv) => ({
              invoiceNumber: inv.invoiceNumber,
              description: inv.description ? inv.description : 'Sin comentario'
            }))
          }
          if(point.survey) {
            pointToCreate.surveyId = point.survey.surveyId
          }
          return pointToCreate
        })
      })
      return Right.create(itinerary)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getItineraryPaginated(page: number): Promise<Either<string, PaginatedResult<Itinerary>>> {
    try {
      const { data } = await api.get('/itinerary', {
        params: {
          page
        }
      })

      const resultsDomain = data._results.map((itinerary: any) => {
        const itineraryDomain = new Itinerary(
          itinerary._itineraryId,
          itinerary._createdAt,
          itinerary._updatedAt
        )
        itineraryDomain.done = itinerary._done
        itineraryDomain.totalPoints = itinerary._totalPoints
        itineraryDomain.scheduleDate = itinerary._scheduleDate
        return itineraryDomain
      })
      
      return Right.create(new PaginatedResult<Itinerary>(resultsDomain, data._pages))
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  } 
}
