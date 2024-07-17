import { Express } from "express";
import { Request, Response } from "express";
import { SucursalCreateController } from "../controllers/SucursalCreateController";
import container from "../dependency-injection";
import { SucursalUpdateController } from "../controllers/SucursalUpdateController";

export const register = (app: Express) => {
  const createSucursalController: SucursalCreateController = container.get('Apps.warehouse.backend.controllers.SucursalCreateController');
  
  const updateSucursalController: SucursalUpdateController = container.get('Apps.warehouse.backend.controllers.SucursalUpdateController');
  
  app.post('/sucursal/:id', (req: Request, res: Response) => createSucursalController.run(req, res));
  
  app.put('/sucursal/:id', (req: Request, res: Response) => updateSucursalController.run(req, res));
}
