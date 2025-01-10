import { Express, Request, Response } from "express";
import container from "../dependency-injection";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { AttendanceUserListController } from "../controllers/attendance/AttendanceUserListController";
import { AttendanceCreatePageController } from "../controllers/attendance/AttendanceCreatePageController";

export const register = (app: Express) => {

  const attendanceUserListController: AttendanceUserListController = container.get('Apps.Backoffice.backend.controllers.AttendanceUserListController');

  const attendanceCreatePageController: AttendanceCreatePageController = container.get('Apps.Backoffice.backend.controllers.AttendanceCreatePageController');

  app.use('/attendance', ensureAuthenticated);  
  
  app.get('/attendance', (req: Request, res: Response) => attendanceUserListController.run(req, res));

  app.get('/attendance/:userId/new', (req: Request, res: Response) => attendanceCreatePageController.run(req, res));
}
