import { Express } from "express";
import { Request, Response } from "express";
import { SucursalCreateController } from "../controllers/SucursalCreateController";
import container from "../dependency-injection";
import { v4 as uuid } from "uuid";
import { SucursalUpdateController } from "../controllers/SucursalUpdateController";
import { SucursalFindAllController } from "../controllers/sucursal/SucursalFindAllController";
import { SucursalSearchController } from "../controllers/sucursal/SucursalSearchController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";

export const register = (app: Express) => {
  const createSucursalController: SucursalCreateController = container.get('Apps.Backoffice.backend.controllers.SucursalCreateController');
  
  const updateSucursalController: SucursalUpdateController = container.get('Apps.Backoffice.backend.controllers.SucursalUpdateController');
  
  const findAllSucursalController: SucursalFindAllController = container.get('Apps.Backoffice.backend.controllers.SucursalFindAllController');

  const searchSucursalController: SucursalSearchController = container.get('Apps.Backoffice.backend.controllers.SucursalSearchController');

  // app.use('/sucursal', ensureAuthenticated, authorizeModule(AppModules.BRANCHES));

  app.post('/sucursal/:id', (req: Request, res: Response) => createSucursalController.run(req, res));
  
  app.get('/sucursal/:id/update', (req: Request, res: Response) => searchSucursalController.run(req, res));

  app.put('/sucursal/:id', (req: Request, res: Response) => updateSucursalController.run(req, res));

  app.get('/sucursal', (req: Request, res: Response) => findAllSucursalController.run(req, res));

  app.get('/sucursal/new', (req: Request, res: Response) => {
    const id = uuid();

    res.render('branches/create', {
      id
    });
  })
}
