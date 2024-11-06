import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import DashBoardInitController from "../controllers/DashboardInitController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { adminRole, surperAdminRole, userRole } from "../../../../Contexts/Shared/domain/roles/Roles";

export const register = (app: Express) => {
  const dashBoardInitController: DashBoardInitController = container.get('Apps.Backoffice.backend.controllers.DashBoardInitController');

  app.get('/', ensureAuthenticated, authorizeRoles(userRole, adminRole, surperAdminRole) ,(req: Request, res: Response) => dashBoardInitController.run(req, res));
}
