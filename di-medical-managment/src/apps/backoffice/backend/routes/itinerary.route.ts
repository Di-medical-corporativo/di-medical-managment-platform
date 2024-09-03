import { Express, Request, Response } from "express"
import container from "../dependency-injection"
import { ItineraryCreatePageController } from "../controllers/itinerary/ItineraryCreatePageController";
import { ItineraryCreateController } from "../controllers/itinerary/ItineraryCreateController";
import { ItineraryFindAllController } from "../controllers/itinerary/ItineraryFindAllController";
import { ItineraryStartController } from "../controllers/itinerary/ItineraryStartController";
import { ItineraryTrackController } from "../controllers/itinerary/ItineraryTrackController";

export const register = (app: Express) => {
  const createItineraryPage: ItineraryCreatePageController = container.get('Apps.Backoffice.backend.controllers.ItineraryCreatePageController');

  const createItineraryController: ItineraryCreateController = container.get('Apps.Backoffice.backend.controllers.ItineraryCreateController');

  const searchAllItineraryController: ItineraryFindAllController  = container.get('Apps.Backoffice.backend.controllers.ItineraryFindAllController');

  const startItineraryController: ItineraryStartController = container.get('Apps.Backoffice.backend.controllers.ItineraryStartController');

  const trackingItineraryController: ItineraryTrackController = container.get('Apps.Backoffice.backend.controllers.ItineraryTrackController');

  app.get('/itinerary/new', (req: Request, res: Response) => createItineraryPage.run(req, res));

  app.get('/itinerary/:id/track', (req: Request, res: Response) => trackingItineraryController.run(req, res));

  app.get('/itinerary', (req: Request, res: Response) => searchAllItineraryController.run(req, res));

  app.post('/itinerary/create', (req: Request, res: Response) => createItineraryController.run(req, res));

  app.post('/itinerary/:id/start', (req: Request, res: Response) => startItineraryController.run(req, res));
}
