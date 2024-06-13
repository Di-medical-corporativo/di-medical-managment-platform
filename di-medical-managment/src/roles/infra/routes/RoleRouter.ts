import { Request, Response, Router } from "express";
import { ContainerBuilder } from "node-dependency-injection";
import { RoleCreateController } from "../controllers/RoleCreateController";

export class RoleRouter {
  public static getRouter(container: ContainerBuilder) {
    const router = Router();
    
    const createController: RoleCreateController = container.get("Roles.controllers.RoleCreateController");
    router.put("/roles/:id", (req: Request, res: Response) => createController.run(req, res));
    return router;

  }
}
