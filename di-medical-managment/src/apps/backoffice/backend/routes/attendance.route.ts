import { Express, Request, Response } from "express";
import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { AttendanceUserListController } from "../controllers/attendance/AttendanceUserListController";
import { AttendanceCreatePageController } from "../controllers/attendance/AttendanceCreatePageController";
import { AttendanceCreateController } from "../controllers/attendance/AttendanceCreateController";
import { AttendanceIssuePageController } from "../controllers/attendance/AttendanceIssuePageController";
import { AttendanceJustificationFindController } from "../controllers/attendance/AttendanceJustificationFindController";
import { AttendanceJustificationAction } from "../controllers/attendance/AttendanceJustificationAction";
import { AttendanceUserIssueController } from "../controllers/attendance/AttendanceUserIssueController";
import { AttendanceJustifyController } from "../controllers/attendance/AttendanceJustifyController";

export const register = (app: Express) => {

  const attendanceUserListController: AttendanceUserListController = container.get('Apps.Backoffice.backend.controllers.AttendanceUserListController');

  const attendanceCreatePageController: AttendanceCreatePageController = container.get('Apps.Backoffice.backend.controllers.AttendanceCreatePageController');

  const attendanceCreateController: AttendanceCreateController = container.get('Apps.Backoffice.backend.controllers.AttendanceCreateController');

  const attendanceIssuePageController: AttendanceIssuePageController = container.get('Apps.Backoffice.backend.controllers.AttendanceIssuePageController');

  const attendanceJustificationFindController: AttendanceJustificationFindController = container.get('Apps.Backoffice.backend.controllers.AttendanceJustificationFindController')

  const attendanceJustificationAction: AttendanceJustificationAction = container.get('Apps.Backoffice.backend.controllers.AttendanceJustificationAction');

  const attendanceUserIssueController: AttendanceUserIssueController = container.get('Apps.Backoffice.backend.controllers.AttendanceUserIssueController');

  const attendanceJustifyController: AttendanceJustifyController = container.get('Apps.Backoffice.backend.controllers.AttendanceJustifyController');

  app.use('/attendance', ensureAuthenticated);  
  
  app.get('/attendance', ensureAuthenticated, authorizeModule(AppModules.ATTENDANCE), (req: Request, res: Response) => attendanceUserListController.run(req, res));

  app.get('/attendance/:userId/new',ensureAuthenticated, authorizeModule(AppModules.ATTENDANCE), (req: Request, res: Response) => attendanceCreatePageController.run(req, res));

  app.get('/attendance/:userId/history', ensureAuthenticated, authorizeModule(AppModules.ATTENDANCE), (req: Request, res: Response) => attendanceIssuePageController.run(req, res));

  app.post('/attendance/:userId/new', ensureAuthenticated, authorizeModule(AppModules.ATTENDANCE), (req: Request, res: Response) => attendanceCreateController.run(req, res));

  app.get('/attendance/:justificationId/justification',ensureAuthenticated, authorizeModule(AppModules.ATTENDANCE), (req: Request, res: Response) => attendanceJustificationFindController.run(req, res));

  app.put('/attendance/:justificationId/action', ensureAuthenticated, authorizeModule(AppModules.ATTENDANCE),(req: Request, res: Response) => attendanceJustificationAction.run(req, res));

  app.get('/attendance/myhistory', ensureAuthenticated, (req: Request, res: Response) => attendanceUserIssueController.run(req, res));
  
  app.post('/attendance/:issueId/justify', ensureAuthenticated,(req: Request, res: Response) => attendanceJustifyController.run(req, res));

  app.get('/attendance/:issueId/justify', ensureAuthenticated, (req: Request, res: Response) => {
    const id = uuid();

    const { issueId } = req.params;
    
    res.render('attendance/justify', {
      id,
      issueId
    });
  });

}
