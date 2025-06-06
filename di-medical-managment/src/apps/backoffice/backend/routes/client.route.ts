import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { Express, Request, Response } from "express";
import { ClientCreateController } from "../controllers/client/ClientCreateController"
import { ClientUpdateController } from "../controllers/client/ClientUpdateController";
import { ClientFindAllController } from "../controllers/client/ClientFindAllController";
import { ClientSearchController } from "../controllers/client/ClientSearchController";
import { ClientDeleteController } from "../controllers/client/ClientDeleteController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { ClientFindAllJsonController } from "../controllers/client/ClientFindAllJsonController";

export const register = (app: Express) => {
  const createClientController: ClientCreateController = container.get('Apps.Backoffice.backend.controllers.ClientCreateController');

  const updateClientController: ClientUpdateController = container.get('Apps.Backoffice.backend.controllers.ClientUpdateController');

  const findAllClientController: ClientFindAllController = container.get('Apps.Backoffice.backend.controllers.ClientFindAllController');

  const searchClientController: ClientSearchController = container.get('Apps.Backoffice.backend.controllers.ClientSearchController');

  const deleteClientController: ClientDeleteController = container.get('Apps.Backoffice.backend.controllers.ClientDeleteController');

  const findAllJsonClientController: ClientFindAllJsonController = container.get('Apps.Backoffice.backend.controllers.ClientFindAllJsonController');

  app.get('/clients/json', async (req: Request, res: Response) => {
    await findAllJsonClientController.run(req, res)
  });

  app.use('/client', ensureAuthenticated, authorizeModule(AppModules.CLIENTS));

  app.post('/client/:id', (req: Request, res: Response) => createClientController.run(req, res));
  
  app.put('/client/:id', (req: Request, res: Response) => updateClientController.run(req, res));

  app.get('/client/:id/update', (req: Request, res: Response) => searchClientController.run(req, res));
  
  app.get('/client/', (req: Request, res: Response) => findAllClientController.run(req, res));

  app.delete('/client/:id', (req: Request, res: Response) => deleteClientController.run(req, res));

  app.get('/client/new', (req: Request, res: Response) => {
    const id = uuid();
    
    res.render('clients/create', {
      id
    });
  });
}
