import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { TruckCreateController } from "../controllers/truck/TruckCreateController";
import { TruckUpdateController } from "../controllers/truck/TruckUpdateController";
import { IncidentCreateController } from "../controllers/truck/IncidentCreateController";
import { TruckFindAllController } from "../controllers/truck/TruckFindAllController";

export const register = (app: Express) => {
  const createTruckController: TruckCreateController = container.get('Apps.Backoffice.backend.controllers.TruckCreateController');
  
  const updateTruckController: TruckUpdateController = container.get('Apps.Backoffice.backend.controllers.TruckUpdateController');
  
  const createIncidentController: IncidentCreateController = container.get('Apps.Backoffice.backend.controllers.IncidentCreateController');

  const findAllTruckController: TruckFindAllController = container.get('Apps.Backoffice.backend.controllers.TruckFindAllController');

  app.post('/truck/:id', (req: Request, res: Response) => createTruckController.run(req, res));

  app.put('/truck/:id', (req: Request, res: Response) => updateTruckController.run(req, res));
  
  app.post('/truck/:truckId/incident/:incidentId', (req: Request, res: Response) => createIncidentController.run(req, res));

  app.get('/truck', (req: Request, res: Response) => findAllTruckController.run(req, res));
}
