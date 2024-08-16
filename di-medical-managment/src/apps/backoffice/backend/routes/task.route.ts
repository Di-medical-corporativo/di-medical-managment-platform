import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { TaskCreateController } from "../controllers/tasks/TaskCreateController";
import { TaskCreatePageController } from "../controllers/tasks/TaskCreatePageController";
import { TaskGlobalKanban } from "../controllers/tasks/TaskGlobalKanban";

export const register = (app: Express) => {
  const createTaskController: TaskCreateController = container.get('Apps.Backoffice.backend.controllers.TaskCreateController');

  const createPageTaskController: TaskCreatePageController = container.get('Apps.Backoffice.backend.controllers.TaskCreatePageController');

  const globalKanbanTaskController: TaskGlobalKanban = container.get('Apps.Backoffice.backend.controllers.TaskGlobalKanban');

  app.post('/task/:id', (req: Request, res: Response) => createTaskController.run(req, res));

  app.get('/task/new', (req: Request, res: Response) => createPageTaskController.run(req, res));

  app.get('/task/', (req: Request, res: Response) => globalKanbanTaskController.run(req, res));
}
