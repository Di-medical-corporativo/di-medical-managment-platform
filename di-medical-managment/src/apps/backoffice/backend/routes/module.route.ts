import { Express, Request, Response } from "express";
import { ModuleFindAllController } from "../controllers/modules/ModuleFindAllController";
import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { ModuleCreateController } from "../controllers/modules/ModuleCreateController";

export const register = (app: Express) => {
  const moduleFindAllController: ModuleFindAllController = container.get('Apps.Backoffice.backend.controllers.ModuleFindAllController');

  const moduleCreateController: ModuleCreateController = container.get('Apps.Backoffice.backend.controllers.ModuleCreateController');

  app.get('/modules', (req: Request, res: Response) => moduleFindAllController.run(req, res));

  app.post('/modules/:id/', (req: Request, res: Response) => moduleCreateController.run(req, res));

  app.get('/modules/new', (req: Request, res: Response) => {
    const id = uuid();

    res.render('modules/create', {
      id
    })
  });
}
