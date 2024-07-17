import { Express, Request, Response } from "express"
import { ClientCreateController } from "../controllers/client/ClientCreateController"
import container from "../dependency-injection"
import { ClientUpdateController } from "../controllers/client/ClientUpdateController";

export const register = (app: Express) => {
  const createClientController: ClientCreateController = container.get('Apps.Backoffice.backend.controllers.ClientCreateController');
  
  const updateClientController: ClientUpdateController = container.get('Apps.Backoffice.backend.controllers.ClientUpdateController');

  app.post('/client/:id', (req: Request, res: Response) => createClientController.run(req, res));
  
  app.put('/client/:id', (req: Request, res: Response) => updateClientController.run(req, res));
}
