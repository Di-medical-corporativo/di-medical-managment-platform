import { Express, Request, Response } from "express"
import container from "../dependency-injection"
import { ItineraryCreatePageController } from "../controllers/itinerary/ItineraryCreatePageController";
import { ItineraryCreateController } from "../controllers/itinerary/ItineraryCreateController";

export const register = (app: Express) => {
  const createItineraryPage: ItineraryCreatePageController = container.get('Apps.Backoffice.backend.controllers.ItineraryCreatePageController');

  const createItineraryController: ItineraryCreateController = container.get('Apps.Backoffice.backend.controllers.ItineraryCreateController');

  app.get('/itinerary/new', (req: Request, res: Response) => createItineraryPage.run(req, res));

  app.post('/itinerary/create', (req: Request, res: Response) => createItineraryController.run(req, res));
}
