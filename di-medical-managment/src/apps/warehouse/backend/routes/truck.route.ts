import { Express } from "express";
import { Request, Response } from "express";
import { SucursalCreateController } from "../controllers/SucursalCreateController";
import container from "../dependency-injection";
import { SucursalUpdateController } from "../controllers/SucursalUpdateController";
import { TruckCreateController } from "../controllers/truck/TruckCreateController";
import { TruckUpdateController } from "../controllers/truck/TruckUpdateController";

export const register = (app: Express) => {
  const createTruckController: TruckCreateController = container.get('Apps.warehouse.backend.controllers.TruckCreateController');
  const updateTruckController: TruckUpdateController = container.get('Apps.warehouse.backend.controllers.TruckUpdateController');

  app.post('/truck/:id', (req: Request, res: Response) => createTruckController.run(req, res));
  app.put('/truck/:id', (req: Request, res: Response) => updateTruckController.run(req, res));
}
