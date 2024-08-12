import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { UserCreateController } from "../controllers/UserCreateController";
import { UserSearchAllController } from "../controllers/users/UserSearchAllController";

export const register = (app: Express) => {
  const createUserController: UserCreateController = container.get('Apps.Backoffice.backend.controllers.UserCreateController');

  const searchAllController: UserSearchAllController = container.get('Apps.Backoffice.backend.controllers.UserSearchAllController');

  app.post('/user/:id', (req: Request, res: Response) => createUserController.run(req, res));

  app.get('/user/', (req: Request, res: Response) => searchAllController.run(req, res));
}
