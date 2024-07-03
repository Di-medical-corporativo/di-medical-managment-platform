import { Router } from "express";
import { ContainerBuilder } from "node-dependency-injection";
import { SucursalCreateController } from "../controllers/SucursalCreateController";
import { Request, Response } from "express";

export class SucursalRouter {
  public static getRouter(container: ContainerBuilder) {
    const router = Router();

    const createSucursalController: SucursalCreateController = container.get('Sucural.controller.SucursalCreateController');
    router.post('/sucursal/:id', (req: Request, res: Response) => createSucursalController.run(req, res));

    return router;
  }  
}
