import { ItinerarySearcher } from "../../../../../Contexts/Backoffice/Itinerary/application/SearchAll/ItinerarySearcher";
import { Request, Response } from "express";


export class ItineraryFindAllController {
  constructor(
    private itinerarySearcher: ItinerarySearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const itineraries = await this.itinerarySearcher.run();

      res.status(200).render('itinerary/main', {
        itineraries: itineraries.map(i => i.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
