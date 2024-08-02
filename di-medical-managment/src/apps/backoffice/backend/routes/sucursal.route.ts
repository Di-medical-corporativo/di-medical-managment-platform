import { Express } from "express";
import { Request, Response } from "express";
import { SucursalCreateController } from "../controllers/SucursalCreateController";
import container from "../dependency-injection";
import { SucursalUpdateController } from "../controllers/SucursalUpdateController";
import { SucursalFindAllController } from "../controllers/sucursal/SucursalFindAllController";

export const register = (app: Express) => {
  const createSucursalController: SucursalCreateController = container.get('Apps.Backoffice.backend.controllers.SucursalCreateController');
  
  const updateSucursalController: SucursalUpdateController = container.get('Apps.Backoffice.backend.controllers.SucursalUpdateController');
  
  const findAllSucursalController: SucursalFindAllController = container.get('Apps.Backoffice.backend.controllers.SucursalFindAllController');

  app.post('/sucursal/:id', (req: Request, res: Response) => createSucursalController.run(req, res));
  
  app.put('/sucursal/:id', (req: Request, res: Response) => updateSucursalController.run(req, res));

  app.get('/sucursal', (req: Request, res: Response) => findAllSucursalController.run(req, res));
}
