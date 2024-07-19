import { Express, Request, Response } from "express"
import { SurveyCreateController } from "../controllers/survey/SurveyCreateController";
import container from "../dependency-injection";

export const register = (app: Express) => {
  const createSurveyController: SurveyCreateController = container.get('Apps.Backoffice.backend.controllers.SurveyCreateController');

  app.post('/survey/:id', (req: Request, res: Response) => createSurveyController.run(req, res));
}
