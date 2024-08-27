import { ItineraryCreator } from "../../../../../Contexts/Backoffice/Itinerary/application/Create/ItineraryCreator";
import { Request, Response } from "express";

export class ItineraryCreateController {
  constructor(
    private itineraryCreator: ItineraryCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      res.redirect('itinerary/main');
    } catch (error) {
      res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        }
      );
    }
  }
}
