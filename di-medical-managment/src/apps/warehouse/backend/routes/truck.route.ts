import { Express } from "express";
import { Request, Response } from "express";
import { SucursalCreateController } from "../controllers/SucursalCreateController";
import container from "../dependency-injection";
import { SucursalUpdateController } from "../controllers/SucursalUpdateController";
import { TruckCreateController } from "../controllers/truck/TruckCreateController";

export const register = (app: Express) => {
  const createTruckController: TruckCreateController = container.get('Apps.warehouse.backend.controllers.TruckCreateController');
  app.post('/truck/:id', (req: Request, res: Response) => createTruckController.run(req, res));
}
