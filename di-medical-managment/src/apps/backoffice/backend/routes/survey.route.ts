import { Express, Request, Response } from "express"
import { SurveyCreateController } from "../controllers/survey/SurveyCreateController";
import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { SurveyAnswerController } from "../controllers/survey/SurveyAnswerController";
import { SurveyFindAllController } from "../controllers/survey/SurveyFindAllController";
import { SurveySearchController } from "../controllers/survey/SurveySearchController";
import { SurveyCloseController } from "../controllers/survey/SurveyCloseController";
import { SurveyResultsController } from "../controllers/survey/SurveyResultsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { surperAdminRole } from "../../../../Contexts/Shared/domain/roles/Roles";
import { SurveyOpenController } from "../controllers/survey/SurveyOpenController";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { SurveyAnswerPointController } from "../controllers/survey/SurveyAnswerPointController";
import { SurveyAnswerPointPageController } from "../controllers/survey/SurveyAnswerPointPageController";
import { SurveyIndividualAnswersController } from "../controllers/survey/SurveyIndividualAnswersController";

export const register = (app: Express) => {
  const createSurveyController: SurveyCreateController = container.get('Apps.Backoffice.backend.controllers.SurveyCreateController');

  const answerSurveyController: SurveyAnswerController = container.get('Apps.Backoffice.backend.controllers.SurveyAnswerController');

  const findAllSurveyController: SurveyFindAllController = container.get('Apps.Backoffice.backend.controllers.SurveyFindAllController');

  const searchSurveyController: SurveySearchController = container.get('Apps.Backoffice.backend.controllers.SurveySearchController');

  const closeSurveyController: SurveyCloseController = container.get('Apps.Backoffice.backend.controllers.SurveyCloseController');
 
  const openSurveyController: SurveyOpenController = container.get('Apps.Backoffice.backend.controllers.SurveyOpenController');

  const resultsSurveyController: SurveyResultsController = container.get('Apps.Backoffice.backend.controllers.SurveyResultsController');

  const surveyAnswerPointController: SurveyAnswerPointController = container.get('Apps.Backoffice.backend.controllers.SurveyAnswerPointController');

  const surveyAnswerPointPageController: SurveyAnswerPointPageController = container.get('Apps.Backoffice.backend.controllers.SurveyAnswerPointPageController');

  const surveyIndividualAnswersController: SurveyIndividualAnswersController = container.get('Apps.Backoffice.backend.controllers.SurveyIndividualAnswersController');

  app.post('/survey/:id',  ensureAuthenticated, authorizeModule(AppModules.SURVEYS), (req: Request, res: Response) => createSurveyController.run(req, res));

  app.post('/survey/:id/answer', (req: Request, res: Response) => answerSurveyController.run(req, res));

  app.post('/survey-point/:pointId/answer', (req: Request, res: Response) => surveyAnswerPointController.run(req, res));

  app.post('/survey/:id/close',  ensureAuthenticated, authorizeModule(AppModules.SURVEYS), (req: Request, res: Response) => closeSurveyController.run(req, res));

  app.post('/survey/:id/open',  ensureAuthenticated, authorizeModule(AppModules.SURVEYS), (req: Request, res: Response) => openSurveyController.run(req, res));

  app.get('/survey/:id/answer', (req: Request, res: Response) => searchSurveyController.run(req, res));

  app.get('/survey-point/:id/point/:pointId', (req: Request, res: Response) => surveyAnswerPointPageController.run(req, res));

  app.get('/survey/:id/results',  ensureAuthenticated, authorizeModule(AppModules.SURVEYS), (req: Request, res: Response) => resultsSurveyController.run(req, res));

  app.get('/survey/:id/results/individual', ensureAuthenticated, authorizeModule(AppModules.SURVEYS), (req: Request, res: Response) => surveyIndividualAnswersController.run(req, res));

  app.get('/survey/',  ensureAuthenticated, authorizeModule(AppModules.SURVEYS), (req: Request, res: Response) => findAllSurveyController.run(req, res));

  app.get('/survey/new',  ensureAuthenticated, authorizeModule(AppModules.SURVEYS), (req: Request, res: Response) => {
    const id = uuid();

    res.status(200).render('surveys/create', {
      id
    });
  });

  app.get('/survey/thx', (req: Request, res: Response) => {
    res.status(200).render('surveys/thx');
  });
}
