import { Express, Request, Response } from "express"
import { ClientCreateController } from "../controllers/client/ClientCreateController"
import container from "../dependency-injection"

export const register = (app: Express) => {
  const createClientController: ClientCreateController = container.get('Apps.warehouse.backend.controllers.ClientCreateController');

  app.post('/client/:id', (req: Request, res: Response) => createClientController.run(req, res));
}
