import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { TaskCreateController } from "../controllers/tasks/TaskCreateController";
import { TaskCreatePageController } from "../controllers/tasks/TaskCreatePageController";
import { TaskGlobalKanban } from "../controllers/tasks/TaskGlobalKanban";
import { TaskSearchController } from "../controllers/tasks/TaskSearchController";
import { TaskUpdateController } from "../controllers/tasks/TaskUpdateController";

export const register = (app: Express) => {
  const createTaskController: TaskCreateController = container.get('Apps.Backoffice.backend.controllers.TaskCreateController');

  const createPageTaskController: TaskCreatePageController = container.get('Apps.Backoffice.backend.controllers.TaskCreatePageController');

  const globalKanbanTaskController: TaskGlobalKanban = container.get('Apps.Backoffice.backend.controllers.TaskGlobalKanban');

  const searchTaskController: TaskSearchController = container.get('Apps.Backoffice.backend.controllers.TaskSearchController');

  const updateTaskController: TaskUpdateController = container.get('Apps.Backoffice.backend.controllers.TaskUpdateController');

  app.post('/task/:id', (req: Request, res: Response) => createTaskController.run(req, res));

  app.put('/task/:id', (req: Request, res: Response) => updateTaskController.run(req, res));

  app.get('/task/new', (req: Request, res: Response) => createPageTaskController.run(req, res));

  app.get('/task/', (req: Request, res: Response) => globalKanbanTaskController.run(req, res));

  app.get('/task/:id/update', (req: Request, res: Response) => searchTaskController.run(req, res));
}
