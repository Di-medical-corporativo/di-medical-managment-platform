import container from "../dependency-injection";
import { Express, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { ProductsFindAllController } from "../controllers/products/ProductsFindAllController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { TagsFindAllController } from "../controllers/products/TagsFindAllController";
import { TagCreateController } from "../controllers/products/TagCreateController";
import { TagDeleteController } from "../controllers/products/TagDeleteController";
import { BrandFindAllController } from "../controllers/products/BrandFindAllController";
import { BrandCreateController } from "../controllers/products/BrandCreateController";

export const register = (app: Express) => {
  const findAllProductController: ProductsFindAllController = container.get('Apps.Backoffice.backend.controllers.ProductsFindAllController');

  const findAllTagsController: TagsFindAllController = container.get('Apps.Backoffice.backend.controllers.TagsFindAllController');

  const createTagController: TagCreateController = container.get('Apps.Backoffice.backend.controllers.TagCreateController');

  const deleteTagController: TagDeleteController = container.get('Apps.Backoffice.backend.controllers.TagDeleteController');
  
  const findAllBrandsController: BrandFindAllController = container.get('Apps.Backoffice.backend.controllers.BrandFindAllController');

  const createBrandController: BrandCreateController = container.get('Apps.Backoffice.backend.controllers.BrandCreateController');

  app.use('/product', ensureAuthenticated);

  app.get('/product', (req: Request, res: Response) => findAllProductController.run(req, res));

  app.get('/product/tag',(req: Request, res: Response) => findAllTagsController.run(req, res));

  app.get('/product/brand',(req: Request, res: Response) => findAllBrandsController.run(req, res));

  app.get('/product/tag/new',(req: Request, res: Response) => {
    const id = uuid();
    
    res.status(200).render('products/new-tag', {
      id
    });
  });

  app.get('/product/brand/new',(req: Request, res: Response) => {
    const id = uuid();
    
    res.status(200).render('products/new-brand', {
      id
    });
  });

  app.post('/product/tag/:id/new', (req: Request, res: Response) => createTagController.run(req, res));

  app.post('/product/brand/:id/new', (req: Request, res: Response) => createBrandController.run(req, res));

  app.delete('/product/tag/:id/delete', (req: Request, res: Response) => deleteTagController.run(req, res));
}
