import { AxiosError } from "axios";
import { api } from "src/boot/axios";
import { Either, Left, Right } from "src/entities/Either";
import { Itinerary } from "src/entities/Itinerary";
import { Point } from "src/entities/Point";

export interface ItineraryFacadeI {
  registerItinerary(itinerary: Itinerary): Promise<Either<string, Itinerary>>
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
      console.log(data);
      return Right.create(itinerary)
    } catch (error) {
      console.log(error);
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
}
