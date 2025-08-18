import container from "../dependency-injection";
import { Express } from "express";
import { Request, Response } from "express";
import { TaskCreateController } from "../controllers/tasks/TaskCreateController";
import { TaskCreatePageController } from "../controllers/tasks/TaskCreatePageController";
import { TaskGlobalKanban } from "../controllers/tasks/TaskGlobalKanban";
import { TaskSearchController } from "../controllers/tasks/TaskSearchController";
import { TaskUpdateController } from "../controllers/tasks/TaskUpdateController";
import { TaskDeleteController } from "../controllers/tasks/TaskDeleteController";
import { TaskChangeStatusController } from "../controllers/tasks/TaskChangeStatusController";
import { TaskDetailPageController } from "../controllers/tasks/TaskDetailPageController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { TaskChangeStatusAdmin } from "../controllers/tasks/TaskChangeStatusAdmin";
import { TaskFilterKanbanController } from "../controllers/tasks/TaskFilterKanbanController";
import { TaskCommentPageController } from "../controllers/tasks/TaskCommentPageController";
import { TaskCommentController } from "../controllers/tasks/TaskCommentController";

export const register = (app: Express) => {
  const createTaskController: TaskCreateController = container.get('Apps.Backoffice.backend.controllers.TaskCreateController');

  const createPageTaskController: TaskCreatePageController = container.get('Apps.Backoffice.backend.controllers.TaskCreatePageController');

  const globalKanbanTaskController: TaskGlobalKanban = container.get('Apps.Backoffice.backend.controllers.TaskGlobalKanban');

  const searchTaskController: TaskSearchController = container.get('Apps.Backoffice.backend.controllers.TaskSearchController');

  const updateTaskController: TaskUpdateController = container.get('Apps.Backoffice.backend.controllers.TaskUpdateController');

  const deleteTaskController: TaskDeleteController = container.get('Apps.Backoffice.backend.controllers.TaskDeleteController');

  const changeStatusTaskController: TaskChangeStatusController = container.get('Apps.Backoffice.backend.controllers.TaskChangeStatusController');

  const detailTaskController: TaskDetailPageController = container.get('Apps.Backoffice.backend.controllers.TaskDetailPageController');

  const changeStatusAdminController: TaskChangeStatusAdmin = container.get('Apps.Backoffice.backend.controllers.TaskChangeStatusAdmin');

  const taskFilterKanbanController: TaskFilterKanbanController = container.get('Apps.Backoffice.backend.controllers.TaskFilterKanbanController');

  const taskCommentPageController: TaskCommentPageController = container.get('Apps.Backoffice.backend.controllers.TaskCommentPageController');

  const taskCommentController: TaskCommentController = container.get('Apps.Backoffice.backend.controllers.TaskCommentController');

  app.post('/task/:id/comment', ensureAuthenticated, (req: Request, res: Response) => taskCommentController.run(req, res));

  app.get('/task/:id/comments', ensureAuthenticated, (req: Request, res: Response) => taskCommentPageController.run(req, res));

  app.post('/task/filter', ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => taskFilterKanbanController.run(req, res))

  app.post('/task/:id',  ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => createTaskController.run(req, res));

  app.put('/task/:id',  ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => updateTaskController.run(req, res));

  app.put('/task/:id/nextStatus',  ensureAuthenticated ,(req: Request, res: Response) => changeStatusTaskController.run(req, res));

  app.put('/task/:id/nextStatus/admin', ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => changeStatusAdminController.run(req, res));

  app.delete('/task/:id', ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => deleteTaskController.run(req, res))

  app.get('/task/new', ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => createPageTaskController.run(req, res));

  app.get('/task/', ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => globalKanbanTaskController.run(req, res));

  app.get('/task/:id/update', ensureAuthenticated, authorizeModule(AppModules.TASKS), (req: Request, res: Response) => searchTaskController.run(req, res));

  app.get('/task/:id/detail', ensureAuthenticated, (req: Request, res: Response) => detailTaskController.run(req, res));

}
