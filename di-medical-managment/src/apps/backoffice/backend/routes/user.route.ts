import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { UserCreateController } from "../controllers/UserCreateController";
import { UserSearchAllController } from "../controllers/users/UserSearchAllController";
import { UserCreatePageController } from "../controllers/users/UserCreatePageController";
import { UserUpdateController } from "../controllers/users/UserUpdateController";
import { UserSearchController } from "../controllers/users/UserSearchController";
import { UserDeleteController } from "../controllers/users/UserDeleteController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { surperAdminRole } from "../../../../Contexts/Shared/domain/roles/Roles";


export const register = (app: Express) => {
  const createUserController: UserCreateController = container.get('Apps.Backoffice.backend.controllers.UserCreateController');

  const findAllController: UserSearchAllController = container.get('Apps.Backoffice.backend.controllers.UserSearchAllController');

  const createPageUserController: UserCreatePageController = container.get('Apps.Backoffice.backend.controllers.UserCreatePageController');

  const updateUserController: UserUpdateController = container.get('Apps.Backoffice.backend.controllers.UserUpdateController');

  const searchUserContoller: UserSearchController = container.get('Apps.Backoffice.backend.controllers.UserSearchController');

  const deleteUserController: UserDeleteController = container.get('Apps.Backoffice.backend.controllers.UserDeleteController');

  app.post('/user/:id', (req: Request, res: Response) => createUserController.run(req, res));

  app.put('/user/:id', (req: Request, res: Response) => updateUserController.run(req, res));

  app.delete('/user/:id', (req: Request, res: Response) => deleteUserController.run(req, res));

  app.get('/user/', (req: Request, res: Response) => findAllController.run(req, res));

  app.get('/user/:id/update', (req: Request, res: Response) => searchUserContoller.run(req, res));

  app.get('/user/new', (req: Request, res: Response) => createPageUserController.run(req, res));
}
