import { Express, Request, Response } from "express"
import { SurveyCreateController } from "../controllers/survey/SurveyCreateController";
import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { SurveyAnswerController } from "../controllers/survey/SurveyAnswerController";
import { SurveyFindAllController } from "../controllers/survey/SurveyFindAllController";
import { SurveySearchController } from "../controllers/survey/SurveySearchController";
import { SurveyCloseController } from "../controllers/survey/SurveyCloseController";

export const register = (app: Express) => {
  const createSurveyController: SurveyCreateController = container.get('Apps.Backoffice.backend.controllers.SurveyCreateController');

  const answerSurveyController: SurveyAnswerController = container.get('Apps.Backoffice.backend.controllers.SurveyAnswerController');

  const findAllSurveyController: SurveyFindAllController = container.get('Apps.Backoffice.backend.controllers.SurveyFindAllController');

  const searchSurveyController: SurveySearchController = container.get('Apps.Backoffice.backend.controllers.SurveySearchController');

  const closeSurveyController: SurveyCloseController = container.get('Apps.Backoffice.backend.controllers.SurveyCloseController');
 
  app.post('/survey/:id', (req: Request, res: Response) => createSurveyController.run(req, res));

  app.post('/survey/:id/answer', (req: Request, res: Response) => answerSurveyController.run(req, res));

  app.post('/survey/:id/close', (req: Request, res: Response) => closeSurveyController.run(req, res));

  app.get('/survey/:id/answer', (req: Request, res: Response) => searchSurveyController.run(req, res));

  app.get('/survey/', (req: Request, res: Response) => findAllSurveyController.run(req, res));

  app.get('/survey/new', (req: Request, res: Response) => {
    const id = uuid();

    res.status(200).render('surveys/create', {
      id
    });
  });
}
