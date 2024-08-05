import { Express, Request, Response } from "express"
import { SurveyCreateController } from "../controllers/survey/SurveyCreateController";
import container from "../dependency-injection";
import { SurveyAnswerController } from "../controllers/survey/SurveyAnswerController";
import { SurveyFindAllController } from "../controllers/survey/SurveyFindAllController";

export const register = (app: Express) => {
  const createSurveyController: SurveyCreateController = container.get('Apps.Backoffice.backend.controllers.SurveyCreateController');

  const answerSurveyController: SurveyAnswerController = container.get('Apps.Backoffice.backend.controllers.SurveyAnswerController');

  const findAllSurveyController: SurveyFindAllController = container.get('Apps.Backoffice.backend.controllers.SurveyFindAllController');

  app.post('/survey/:id', (req: Request, res: Response) => createSurveyController.run(req, res));

  app.post('/survey/:id/answer', (req: Request, res: Response) => answerSurveyController.run(req, res));

  app.get('/survey/', (req: Request, res: Response) => findAllSurveyController.run(req, res));
}
