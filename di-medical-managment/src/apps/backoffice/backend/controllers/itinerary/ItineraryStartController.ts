import { ItineraryStarter } from "../../../../../Contexts/Backoffice/Itinerary/application/StartItinerary/ItineraryStarter";
import { Request, Response } from "express";
import { ItineraryNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryNotFound";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";

export class ItineraryStartController {
  constructor(
    private itineraryStarter: ItineraryStarter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;
      
      console.log(id)

      await this.itineraryStarter.run({
        id: new ItineraryId(id)
      });

      res.redirect('/backoffice/itinerary');
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
