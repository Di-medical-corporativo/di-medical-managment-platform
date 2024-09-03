import { ItineraryTracker } from "../../../../../Contexts/Backoffice/Itinerary/application/Tracking/ItineraryTracker";
import { Request, Response } from "express";
import { ItineraryNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryNotFound";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";

export class ItineraryTrackController {
  constructor(
    private itineraryTracker: ItineraryTracker
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const itinerary = await this.itineraryTracker.run({
        id: new ItineraryId(id)
      });

      console.log(itinerary.toPrimitives().points[0])

      res.status(200).render('itinerary/tracking', {
        itinerary: itinerary.toPrimitives()
      });
    } catch (error) {
      if(error instanceof ItineraryNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la ruta'
        });
      }
      
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
