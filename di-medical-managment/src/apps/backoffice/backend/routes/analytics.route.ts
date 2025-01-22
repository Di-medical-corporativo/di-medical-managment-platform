import container from "../dependency-injection";
import { Express, Request, Response } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { AnalyticsPageController } from "../controllers/analytics/AnalyticsPageController";
import { GeneralUserReportController } from "../controllers/analytics/GeneralUserReportController";
import { GeneralitineraryReportController } from "../controllers/analytics/GeneralitineraryReportController";
import { GeneralPointsPerPersonReport } from "../controllers/analytics/GeneralPointsPerPersonReport";

export const register = (app: Express) => {
  const analyticsPageController: AnalyticsPageController = container.get('Apps.Backoffice.backend.controllers.AnalyticsPageController');

  const generalUserReportController: GeneralUserReportController = container.get('Apps.Backoffice.backend.controllers.GeneralUserReportController');

  const generalItineraryReportController: GeneralitineraryReportController = container.get('Apps.Backoffice.backend.controllers.GeneralitineraryReportController');

  const generalPointsUserGeneral: GeneralPointsPerPersonReport = container.get('Apps.Backoffice.backend.controllers.GeneralPointsPerPersonReport');

  app.use('/analytics', ensureAuthenticated, authorizeModule(AppModules.ANALYTICS));

  app.get('/analytics', (req: Request, res: Response) => analyticsPageController.run(req, res));

  app.post('/analytics/user-general-report', (req: Request, res: Response) => generalUserReportController.run(req, res));

  app.post('/analytics/itinerary-general-report', (req: Request, res: Response) => generalItineraryReportController.run(req, res));

  app.post('/analytics/points-user-general-report', (req: Request, res: Response) => generalPointsUserGeneral.run(req, res));
}
