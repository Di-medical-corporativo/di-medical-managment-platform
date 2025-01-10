import { Express, Request, Response } from "express";
import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { DepartmentsFindAllController } from "../controllers/departments/DepartmentsFindAllController";
import { DepartmentCreateController } from "../controllers/departments/DepartmentCreateController";
import { DepartmentUpdatePageController } from "../controllers/departments/DepartmentUpdatePageController";
import { DepartmentsUpdateController } from "../controllers/departments/DepartmentsUpdateController";
import { DepartmentsDeleteController } from "../controllers/departments/DepartmentsDeleteController";

export const register = (app: Express) => {
  const departmentFindAllController: DepartmentsFindAllController = container.get('Apps.Backoffice.backend.controllers.DepartmentsFindAllController');

  const departmentCreateController: DepartmentCreateController = container.get('Apps.Backoffice.backend.controllers.DepartmentCreateController');

  const departmentUpdatePageController: DepartmentUpdatePageController = container.get('Apps.Backoffice.backend.controllers.DepartmentUpdatePageController');

  const departmentUpdateController: DepartmentsUpdateController = container.get('Apps.Backoffice.backend.controllers.DepartmentsUpdateController');

  const departmentDeleteController: DepartmentsDeleteController = container.get('Apps.Backoffice.backend.controllers.DepartmentsDeleteController');

  app.use('/department', ensureAuthenticated, authorizeModule(AppModules.DEPARTMENTS));

  app.get('/department', (req: Request, res: Response) => departmentFindAllController.run(req, res));

  app.post('/department/:id', (req: Request, res: Response) => departmentCreateController.run(req, res));

  app.get('/department/:id/update', (req: Request, res: Response) => departmentUpdatePageController.run(req, res));

  app.put('/department/:id/update', (req: Request, res: Response) => departmentUpdateController.run(req, res));

  app.delete('/department/:id/delete', (req: Request, res: Response) => departmentDeleteController.run(req, res));

  app.get('/department/new', (req: Request, res: Response) => {
    const id = uuid();

    res.render('departments/create', {
      id
    })
  });
}
