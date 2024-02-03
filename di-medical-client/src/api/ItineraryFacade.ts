import { AxiosError } from "axios" 
import { api } from "src/boot/axios" 
import { Client } from "src/entities/Client"
import { Either, Left, Right } from "src/entities/Either"
import { Invoice } from "src/entities/Invoice"
import { Itinerary } from "src/entities/Itinerary" 
import { PaginatedResult } from "src/entities/PaginatedResult" 
import { Point } from "src/entities/Point" 
import { Survey } from "src/entities/Survey"
import { Truck } from "src/entities/Truck"
import { User } from "src/entities/User"

export interface ItineraryFacadeI {
  registerItinerary(itinerary: Itinerary): Promise<Either<string, Itinerary>>
  getItineraryPaginated(page: number): Promise<Either<string, PaginatedResult<Itinerary>>>
  getItineraryById(itineraryId: string): Promise<Either<string, Itinerary>>
  getPointById(pointById: string): Promise<Either<string, Point>>
  deliverPoint(point: Point): Promise<Either<string, Point>>
}

export class ItineraryFacade implements ItineraryFacadeI {

  async getPointById(pointId: string): Promise<Either<string, Point>> {
    try {
      const { data } = await api.get(`/itinerary/point/${pointId}`)
      const pointDomain = new Point(
        data._pointId
      )
      pointDomain.problem = data._problem
      pointDomain.done = data._done
      pointDomain.client = new Client(
        data._clientId,
        data._client._name,
        data._client._address,
        data._client._isActive
      )

      if(data._survey) {
        pointDomain.survey = new Survey(
          data._survey._surveyId,
          data._survey._name,
          data._survey.description,
          data._survey._startDate,
          data._survey._active
        )
      }

      return Right.create(pointDomain)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async deliverPoint(point: Point): Promise<Either<string, Point>> {
    try {
      let data: any = {
        problem: point.hasProblem
      }
      if(point.comment) {
        data.comment = point.comment
      }
      await api.put(`itinerary/point/${point.pointId}`, data)
      return Right.create(point)
    } catch (error) {
      console.log(error)
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getItineraryById(itineraryId: string): Promise<Either<string, Itinerary>> {
    try {
      const { data } = await api.get(`/itinerary/${itineraryId}`)
      console.log(data)
      const itineraryDomain = new Itinerary(data._itineraryId, data._createdAt, data._updatedAt)
      itineraryDomain.done = data._done
      itineraryDomain.scheduleDate = data._scheduleDate
      itineraryDomain.points = data._points.map((point: any) => {
        const pointDomain = new Point(point._pointId)

        if(point._comment) {
          pointDomain.comment = point._comment
        }
        pointDomain.problem = point._problem
        pointDomain.done = point._done
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
