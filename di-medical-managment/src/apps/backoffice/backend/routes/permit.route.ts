import { Express, Request, Response } from "express";
import { PermitCreateController } from "../controllers/permit/PermitCreateController";
import container from "../dependency-injection";
import { PermitByUserPageController } from "../controllers/permit/PermitByUserPageController";
import { PermitFindAllController } from "../controllers/permit/PermitFindAllController";

export const register = (app: Express) => {
  const permitCreateController: PermitCreateController = container.get('Apps.Backoffice.backend.controllers.PermitCreateController');

  const permitByUserPage: PermitByUserPageController = container.get('Apps.Backoffice.backend.controllers.PermitByUserPageController');

  const permitFindAllController: PermitFindAllController = container.get('Apps.Backoffice.backend.controllers.PermitFindAllController');

  app.get('/permit/new', (req: Request, res: Response) => {
    res.status(200).render('permit/create');
  });

  app.get('/permit/mine/', (req: Request, res: Response) => permitByUserPage.run(req, res));

  app.post('/permit/new', (req: Request, res: Response) => permitCreateController.run(req, res));

  app.get('/permit', (req: Request, res: Response) => permitFindAllController.run(req, res));
}
