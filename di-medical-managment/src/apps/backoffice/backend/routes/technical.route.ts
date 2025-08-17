import { v4 as uuid } from "uuid";
import { Express, Request, Response } from "express";
import { TechnicalFindAllController } from "../controllers/technical/TechnicalFindAllController";
import container from "../dependency-injection";
import { TechnicalBrandFindAllController } from "../controllers/technical/TechnicalBrandFindAllController";
import { TechnicalBrandCreateController } from "../controllers/technical/TechnicalBrandCreateController";
import { TechnicalCreatePageController } from "../controllers/technical/TechnicalCreatePageController";
import { TechnicalCreateController } from "../controllers/technical/TechnicalCreateController";
import { MulterRequest, upload } from "../../../../Contexts/Backoffice/Technical/infra/storage/multerUpload";
import { TechnicalDeleteController } from "../controllers/technical/TechnicalDeleteController";

export const register = (app: Express) => {
  const findAllTechnicalController: TechnicalFindAllController = container.get('Apps.Backoffice.backend.controllers.TechnicalFindAllController');

  const findAllTechnicalBrandController: TechnicalBrandFindAllController = container.get('Apps.Backoffice.backend.controllers.TechnicalBrandFindAllController');

  const createTechnicalBrandController: TechnicalBrandCreateController = container.get('Apps.Backoffice.backend.controllers.TechnicalBrandCreateController');

  const createTechnicalPageController: TechnicalCreatePageController = container.get('Apps.Backoffice.backend.controllers.TechnicalCreatePageController');

  const createTechnicalController: TechnicalCreateController = container.get('Apps.Backoffice.backend.controllers.TechnicalCreateController');

  const technicalDeleteController: TechnicalDeleteController = container.get('Apps.Backoffice.backend.controllers.TechnicalDeleteController');

  app.get('/technical', (req: Request, res: Response) => findAllTechnicalController.run(req, res));

  app.get('/technical/brand', (req: Request, res: Response) => findAllTechnicalBrandController.run(req, res));

  app.post('/technical/brand/:id/new', (req: Request, res: Response) => createTechnicalBrandController.run(req, res));

  app.delete('/technical/:id/delete', (req: Request, res: Response) => technicalDeleteController.run(req, res));

  app.get('/technical/new', (req: Request, res: Response) => createTechnicalPageController.run(req, res));

  app.post('/technical/:id/new', upload.single('image'), (req: Request, res: Response) => createTechnicalController.run(req as MulterRequest, res));

  app.get('/technical/brand/new', (req: Request, res: Response) => {
    const id = uuid();

    res.status(200).render('technical/new-brand', {
      id
    });
  });
}
