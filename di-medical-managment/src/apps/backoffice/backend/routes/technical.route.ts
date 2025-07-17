import { Express, Request, Response } from "express";
import { TechnicalFindAllController } from "../controllers/technical/TechnicalFindAllController";
import container from "../dependency-injection";

export const register = (app: Express) => {
  const findAllTechnicalController: TechnicalFindAllController = container.get('Apps.Backoffice.backend.controllers.TechnicalFindAllController');

  app.get('/technical', (req: Request, res: Response) => findAllTechnicalController.run(req, res));
}
