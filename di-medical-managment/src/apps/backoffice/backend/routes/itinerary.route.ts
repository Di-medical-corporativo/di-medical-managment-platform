import { Express, Request, Response } from "express"
import container from "../dependency-injection"
import { ItineraryCreatePageController } from "../controllers/itinerary/ItineraryCreatePageController";
import { ItineraryCreateController } from "../controllers/itinerary/ItineraryCreateController";
import { ItineraryFindAllController } from "../controllers/itinerary/ItineraryFindAllController";
import { ItineraryStartController } from "../controllers/itinerary/ItineraryStartController";
import { ItineraryTrackController } from "../controllers/itinerary/ItineraryTrackController";
import { ItineraryEndController } from "../controllers/itinerary/ItineraryEndController";
import { PointEndPageController } from "../controllers/itinerary/PointEndPageController";
import { PointEndController } from "../controllers/itinerary/PointEndController";
import { ItineraryAddPointPageController } from "../controllers/itinerary/ItineraryAddPointPageController";
import { ItineraryAddPointsController } from "../controllers/itinerary/ItineraryAddPointsController";
import { PointUpdateControllerPage } from "../controllers/itinerary/PointUpdateControllerPage";
import { UpdatePointController } from "../controllers/itinerary/UpdatePointController";
import { ItineraryReportPageController } from "../controllers/itinerary/ItineraryReportPageController";
import { ItineraryImageGeneratorController } from "../controllers/itinerary/ItineraryImageGeneratorController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { adminRole, surperAdminRole } from "../../../../Contexts/Shared/domain/roles/Roles";

export const register = (app: Express) => {
  const createItineraryPage: ItineraryCreatePageController = container.get('Apps.Backoffice.backend.controllers.ItineraryCreatePageController');

  const createItineraryController: ItineraryCreateController = container.get('Apps.Backoffice.backend.controllers.ItineraryCreateController');

  const searchAllItineraryController: ItineraryFindAllController  = container.get('Apps.Backoffice.backend.controllers.ItineraryFindAllController');

  const startItineraryController: ItineraryStartController = container.get('Apps.Backoffice.backend.controllers.ItineraryStartController');

  const trackingItineraryController: ItineraryTrackController = container.get('Apps.Backoffice.backend.controllers.ItineraryTrackController');

  const finishItineraryController: ItineraryEndController = container.get('Apps.Backoffice.backend.controllers.ItineraryEndController');

  const endPointPageController: PointEndPageController = container.get('Apps.Backoffice.backend.controllers.PointEndPageController');

  const endPointController: PointEndController = container.get('Apps.Backoffice.backend.controllers.PointEndController');

  const addPointPageController: ItineraryAddPointPageController = container.get('Apps.Backoffice.backend.controllers.ItineraryAddPointPageController');

  const addPointController: ItineraryAddPointsController = container.get('Apps.Backoffice.backend.controllers.ItineraryAddPointsController');

  const updatePointControllerPage: PointUpdateControllerPage = container.get('Apps.Backoffice.backend.controllers.PointUpdateControllerPage');

  const updatePointController: UpdatePointController = container.get('Apps.Backoffice.backend.controllers.PointUpdateController');

  const reportPointPageController: ItineraryReportPageController = container.get('Apps.Backoffice.backend.controllers.ItineraryReportPageController');

  const imageItineraryGeneratorController: ItineraryImageGeneratorController = container.get('Apps.Backoffice.backend.controllers.ItineraryImageGeneratorController');

  app.use('/itinerary', ensureAuthenticated, authorizeRoles(adminRole, surperAdminRole));

  app.get('/itinerary/new', (req: Request, res: Response) => createItineraryPage.run(req, res));

  app.get('/itinerary/:id/track', (req: Request, res: Response) => trackingItineraryController.run(req, res));

  app.get('/itinerary', (req: Request, res: Response) => searchAllItineraryController.run(req, res));

  app.post('/itinerary/create', (req: Request, res: Response) => createItineraryController.run(req, res));

  app.post('/itinerary/:id/start', (req: Request, res: Response) => startItineraryController.run(req, res));

  app.get('/itinerary/:id/add', (req: Request, res: Response) => addPointPageController.run(req, res));

  app.post('/itinerary/:id/end', (req: Request, res: Response) => finishItineraryController.run(req, res));

  app.get('/itinerary/point/:id/end', (req: Request, res: Response) => endPointPageController.run(req, res));

  app.post('/itinerary/point/:id/end', (req: Request, res: Response) => endPointController.run(req, res));

  app.get('/point/:id/update', (req: Request, res: Response) => updatePointControllerPage.run(req, res));

  app.post('/itinerary/add', (req: Request, res: Response) => addPointController.run(req, res));

  app.put('/point/:id', (req: Request, res: Response) => updatePointController.run(req, res));

  app.get('/itinerary/:id/report', (req: Request, res: Response) => reportPointPageController.run(req, res));

  app.get('/itinerary/:id/image', (req: Request, res: Response) => imageItineraryGeneratorController.run(req, res));
}
