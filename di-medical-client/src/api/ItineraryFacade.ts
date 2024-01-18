import { AxiosError } from "axios" 
import { api } from "src/boot/axios" 
import { Client } from "src/entities/Client"
import { Either, Left, Right } from "src/entities/Either"
import { Invoice } from "src/entities/Invoice"
import { Itinerary } from "src/entities/Itinerary" 
import { PaginatedResult } from "src/entities/PaginatedResult" 
import { Point } from "src/entities/Point" 
import { Truck } from "src/entities/Truck"
import { User } from "src/entities/User"

export interface ItineraryFacadeI {
  registerItinerary(itinerary: Itinerary): Promise<Either<string, Itinerary>>
  getItineraryPaginated(page: number): Promise<Either<string, PaginatedResult<Itinerary>>>
  getItineraryById(itineraryId: string): Promise<Either<string, Itinerary>>
}

export class ItineraryFacade implements ItineraryFacadeI {

  async getItineraryById(itineraryId: string): Promise<Either<string, Itinerary>> {
    try {
      const { data } = await api.get(`/itinerary/${itineraryId}`)
      const itineraryDomain = new Itinerary(data._itineraryId, data._createdAt, data._updatedAt)
      itineraryDomain.done = data._done
      itineraryDomain.scheduleDate = data._scheduleDate
      itineraryDomain.points = data._points.map((point: any) => {
        const pointDomain = new Point(point._pointId)
        pointDomain.assignedDriver = new User(
          point._assignedDriver._userId,
          point._assignedDriver._firstName,
          point._assignedDriver._lastName,
          point._assignedDriver._birthDate,
          point._assignedDriver._nss,
          point._assignedDriver._job,
          point._assignedDriver._picture,
          point._assignedDriver._phone,
          point._assignedDriver._email,
          point._assignedDriver._isActive,
          point._assignedDriver._createdAt,
          point._assignedDriver._updatedAt
        )
        pointDomain.client = new Client(
          point._client._clientId,
          point._client._name,
          point._client._address,
          point._client._isActive
        )
        pointDomain.invoices = point._invoices.map((invoice: any) => {
          return new Invoice(invoice._invoiceId, invoice._invoiceNumber, invoice._description)
        })
        pointDomain.truck = new Truck(
          point._truck._truckId,
          point._truck._plates,
          point._truck._model,
          point._truck._brand,
          point._truck._picture,
          point._truck._isActive
        )

        return pointDomain
      })

      return Right.create(itineraryDomain)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

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
