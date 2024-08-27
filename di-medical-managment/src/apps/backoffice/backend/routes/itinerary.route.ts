import { Express, Request, Response } from "express"
import container from "../dependency-injection"
import { ItineraryCreatePageController } from "../controllers/itinerary/ItineraryCreatePageController";

export const register = (app: Express) => {
  const createItineraryPage: ItineraryCreatePageController = container.get('Apps.Backoffice.backend.controllers.ItineraryCreatePageController');

  app.get('/itinerary/new', (req: Request, res: Response) => createItineraryPage.run(req, res));
}
