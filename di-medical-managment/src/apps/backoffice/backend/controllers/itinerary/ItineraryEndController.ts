import { ItineraryFinisher } from "../../../../../Contexts/Backoffice/Itinerary/application/Finish/ItineraryFinisher";
import { Request, Response } from "express";
import { ItineraryHasActivePoints } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryHasActivePoints";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";

export class ItineraryEndController {
  constructor(
    private itineraryFinisher: ItineraryFinisher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.itineraryFinisher.run({
        id: new ItineraryId(id)
      });

      res.redirect('/backoffice/itinerary');
    } catch (error) {
      if(error instanceof ItineraryHasActivePoints) {
        res.status(400).render('error/error', {
          message: 'Hay puntos en progreso, no puedes terminar la ruta'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
