import { Express, Request, Response } from "express";
import { PermitCreateController } from "../controllers/permit/PermitCreateController";
import container from "../dependency-injection";
import { PermitByUserPageController } from "../controllers/permit/PermitByUserPageController";

export const register = (app: Express) => {
  const permitCreateController: PermitCreateController = container.get('Apps.Backoffice.backend.controllers.PermitCreateController');

  const permitByUserPage: PermitByUserPageController = container.get('Apps.Backoffice.backend.controllers.PermitByUserPageController');

  app.get('/permit/new', (req: Request, res: Response) => {
    res.status(200).render('permit/create');
  });

  app.get('/permit/:id/', (req: Request, res: Response) => permitByUserPage.run(req, res));

  app.post('/permit/new', (req: Request, res: Response) => permitCreateController.run(req, res));
}
