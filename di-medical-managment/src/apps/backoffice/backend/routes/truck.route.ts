import { v4 as uuid } from "uuid";
import { Express } from "express";
import { Request, Response } from "express";
import container from "../dependency-injection";
import { TruckCreateController } from "../controllers/truck/TruckCreateController";
import { TruckUpdateController } from "../controllers/truck/TruckUpdateController";
import { IncidentCreateController } from "../controllers/truck/IncidentCreateController";
import { TruckFindAllController } from "../controllers/truck/TruckFindAllController";
import { TruckSearchController } from "../controllers/truck/TruckSearchController";
import { IncidentFindAllController } from "../controllers/truck/IncidentFindAllController";
import { IncidentRemoveController } from "../controllers/truck/IncidentRemoveController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { adminRole, surperAdminRole } from "../../../../Contexts/Shared/domain/roles/Roles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";

export const register = (app: Express) => {
  const createTruckController: TruckCreateController = container.get('Apps.Backoffice.backend.controllers.TruckCreateController');
  
  const updateTruckController: TruckUpdateController = container.get('Apps.Backoffice.backend.controllers.TruckUpdateController');
  
  const createIncidentController: IncidentCreateController = container.get('Apps.Backoffice.backend.controllers.IncidentCreateController');

  const findAllTruckController: TruckFindAllController = container.get('Apps.Backoffice.backend.controllers.TruckFindAllController');

  const searchTruckController: TruckSearchController = container.get('Apps.Backoffice.backend.controllers.TruckSearchControllers');
  
  const findAllIncidentController: IncidentFindAllController = container.get('Apps.Backoffice.backend.controllers.IncidentFindAllController');

  const removeIncidentController: IncidentRemoveController = container.get('Apps.Backoffice.backend.controllers.IncidentRemoveController');

  app.use('/truck', ensureAuthenticated, authorizeModule(AppModules.TRUCKS));

  app.post('/truck/:id', (req: Request, res: Response) => createTruckController.run(req, res));

  app.get('/truck/:truckId/incidents', (req: Request, res: Response) => findAllIncidentController.run(req, res));

  app.delete('/truck/:truckId/incident/:incidentId', (req: Request, res: Response) => removeIncidentController.run(req, res));

  app.put('/truck/:id', (req: Request, res: Response) => updateTruckController.run(req, res));
  
  app.get('/truck/:id/update', (req: Request, res: Response) => searchTruckController.run(req, res));

  app.post('/truck/:truckId/incident/new', (req: Request, res: Response) => createIncidentController.run(req, res));
  
  app.get('/truck/:truckId/incident/new', (req: Request, res: Response) => {
    const id = uuid();

    const { truckId } = req.params;
    
    res.render('trucks/incident-create', {
      id,
      truckId
    })
  });
  
  app.get('/truck', (req: Request, res: Response) => findAllTruckController.run(req, res));

  app.get('/truck/new', (req: Request, res: Response) => {
    const id = uuid();

    res.status(200).render('trucks/create', {
      id
    });
  });
}
