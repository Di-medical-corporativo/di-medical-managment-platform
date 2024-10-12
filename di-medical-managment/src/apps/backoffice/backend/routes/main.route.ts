import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import DashBoardInitController from "../controllers/DashboardInitController";

export const register = (app: Express) => {
  const dashBoardInitController: DashBoardInitController = container.get('Apps.Backoffice.backend.controllers.DashBoardInitController');

  app.get('/', (req: Request, res: Response) => dashBoardInitController.run(req, res));
}
