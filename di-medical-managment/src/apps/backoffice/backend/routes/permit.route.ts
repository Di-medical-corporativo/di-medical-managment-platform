import { Express, Request, Response } from "express";
import { PermitCreateController } from "../controllers/permit/PermitCreateController";
import container from "../dependency-injection";
import { PermitByUserPageController } from "../controllers/permit/PermitByUserPageController";
import { PermitFindAllController } from "../controllers/permit/PermitFindAllController";
import { PermitAcceptPageController } from "../controllers/permit/PermitAcceptPageController";
import { PermitAcceptController } from "../controllers/permit/PermitAcceptController";
import { PermitRejectPageController } from "../controllers/permit/PermitRejectPageController";
import { PermitRejectController } from "../controllers/permit/PermitRejectController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { adminRole, surperAdminRole, userRole } from "../../../../Contexts/Shared/domain/roles/Roles";

export const register = (app: Express) => {
  const permitCreateController: PermitCreateController = container.get('Apps.Backoffice.backend.controllers.PermitCreateController');

  const permitByUserPage: PermitByUserPageController = container.get('Apps.Backoffice.backend.controllers.PermitByUserPageController');

  const permitFindAllController: PermitFindAllController = container.get('Apps.Backoffice.backend.controllers.PermitFindAllController');

  const permitAcceptPageController: PermitAcceptPageController = container.get('Apps.Backoffice.backend.controllers.PermitAcceptPageController');

  const permitAcceptController: PermitAcceptController = container.get('Apps.Backoffice.backend.controllers.PermitAcceptController');

  const permitRejectPageController: PermitRejectPageController = container.get('Apps.Backoffice.backend.controllers.PermitRejectPageController');

  const permitRejectController: PermitRejectController = container.get('Apps.Backoffice.backend.controllers.PermitRejectController');

  app.use('/permit', ensureAuthenticated);

  app.get('/permit/new', authorizeRoles(userRole, adminRole, surperAdminRole), (req: Request, res: Response) => {
    res.status(200).render('permit/create');
  });

  app.get('/permit/mine/', authorizeRoles(userRole, adminRole, surperAdminRole), (req: Request, res: Response) => permitByUserPage.run(req, res));

  app.post('/permit/new', authorizeRoles(userRole, adminRole, surperAdminRole), (req: Request, res: Response) => permitCreateController.run(req, res));

  app.get('/permit', authorizeRoles(surperAdminRole), (req: Request, res: Response) => permitFindAllController.run(req, res));

  app.get('/permit/:id/accept', authorizeRoles(surperAdminRole), (req: Request, res: Response) => permitAcceptPageController.run(req, res));

  app.post('/permit/:id/accept',authorizeRoles(surperAdminRole), (req: Request, res: Response) => permitAcceptController.run(req, res));

  app.get('/permit/:id/reject', authorizeRoles(surperAdminRole),(req: Request, res: Response) => permitRejectPageController.run(req, res));

  app.post('/permit/:id/reject', authorizeRoles(surperAdminRole),(req: Request, res: Response) => permitRejectController.run(req, res));
}