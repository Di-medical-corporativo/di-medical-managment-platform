import { Request, Response } from "express";
import { ItineraryTracker } from "../../../../../Contexts/Backoffice/Itinerary/application/Tracking/ItineraryTracker";
import { ItineraryNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryNotFound";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";

export class ItineraryPreviewPageController {
  constructor(
    private itineraryTracker: ItineraryTracker
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const itinerary = await this.itineraryTracker.run({
        id: new ItineraryId(id)
      });

      res.status(200).render('itinerary/preview', {
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
