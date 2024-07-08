import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { UserCreateController } from "../controllers/UserCreateController";

export const register = (app: Express) => {
  const createUserController: UserCreateController = container.get('Apps.warehouse.backend.controllers.UserCreateController');

  app.post('/user/:id', (req: Request, res: Response) => createUserController.run(req, res));
}
