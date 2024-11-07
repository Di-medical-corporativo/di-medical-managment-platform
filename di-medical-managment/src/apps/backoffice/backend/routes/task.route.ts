import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { TaskCreateController } from "../controllers/tasks/TaskCreateController";
import { TaskCreatePageController } from "../controllers/tasks/TaskCreatePageController";
import { TaskGlobalKanban } from "../controllers/tasks/TaskGlobalKanban";
import { TaskSearchController } from "../controllers/tasks/TaskSearchController";
import { TaskUpdateController } from "../controllers/tasks/TaskUpdateController";
import { TaskDeleteController } from "../controllers/tasks/TaskDeleteController";
import { TaskChangeStatusController } from "../controllers/tasks/TaskChangeStatusController";
import { TaskDetailPageController } from "../controllers/tasks/TaskDetailPageController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { adminRole, surperAdminRole } from "../../../../Contexts/Shared/domain/roles/Roles";

export const register = (app: Express) => {
  const createTaskController: TaskCreateController = container.get('Apps.Backoffice.backend.controllers.TaskCreateController');

  const createPageTaskController: TaskCreatePageController = container.get('Apps.Backoffice.backend.controllers.TaskCreatePageController');

  const globalKanbanTaskController: TaskGlobalKanban = container.get('Apps.Backoffice.backend.controllers.TaskGlobalKanban');

  const searchTaskController: TaskSearchController = container.get('Apps.Backoffice.backend.controllers.TaskSearchController');

  const updateTaskController: TaskUpdateController = container.get('Apps.Backoffice.backend.controllers.TaskUpdateController');

  const deleteTaskController: TaskDeleteController = container.get('Apps.Backoffice.backend.controllers.TaskDeleteController');

  const changeStatusTaskController: TaskChangeStatusController = container.get('Apps.Backoffice.backend.controllers.TaskChangeStatusController');

  const detailTaskController: TaskDetailPageController = container.get('Apps.Backoffice.backend.controllers.TaskDetailPageController');

  app.use('/task', ensureAuthenticated, authorizeRoles(surperAdminRole, adminRole));

  app.post('/task/:id', (req: Request, res: Response) => createTaskController.run(req, res));

  app.put('/task/:id', (req: Request, res: Response) => updateTaskController.run(req, res));

  app.put('/task/:id/nextStatus', (req: Request, res: Response) => changeStatusTaskController.run(req, res));

  app.delete('/task/:id', (req: Request, res: Response) => deleteTaskController.run(req, res))

  app.get('/task/new', (req: Request, res: Response) => createPageTaskController.run(req, res));

  app.get('/task/', (req: Request, res: Response) => globalKanbanTaskController.run(req, res));

  app.get('/task/:id/update', (req: Request, res: Response) => searchTaskController.run(req, res));

  app.get('/task/:id/detail', (req: Request, res: Response) => detailTaskController.run(req, res));
}
