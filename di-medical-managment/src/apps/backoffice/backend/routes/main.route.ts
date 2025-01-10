import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import DashBoardInitController from "../controllers/DashboardInitController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";

export const register = (app: Express) => {
  const dashBoardInitController: DashBoardInitController = container.get('Apps.Backoffice.backend.controllers.DashBoardInitController');

  app.use('/', ensureAuthenticated, authorizeModule(AppModules.PROFILE));

  app.get('/', (req: Request, res: Response) => dashBoardInitController.run(req, res));
}
