import { Express, Request, Response } from "express";
import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { DepartmentsFindAllController } from "../controllers/departments/DepartmentsFindAllController";

export const register = (app: Express) => {
  const departmentFindAllController: DepartmentsFindAllController = container.get('Apps.Backoffice.backend.controllers.DepartmentsFindAllController');

  app.use('/department', ensureAuthenticated);

  app.get('/department', (req: Request, res: Response) => departmentFindAllController.run(req, res));

  app.get('/department/new', (req: Request, res: Response) => {
    const id = uuid();

    res.render('modules/create', {
      id
    })
  });
}
