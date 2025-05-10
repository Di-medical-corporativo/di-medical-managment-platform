import container from "../dependency-injection";
import { Express, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { authorizeModule } from "../middlewares/authorizeRoles";
import { AppModules } from "../../../../Contexts/Shared/domain/AppModules";
import { ProductsFindAllController } from "../controllers/products/ProductsFindAllController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { TagsFindAllController } from "../controllers/products/TagsFindAllController";

export const register = (app: Express) => {
  const findAllProductController: ProductsFindAllController = container.get('Apps.Backoffice.backend.controllers.ProductsFindAllController');

  const findAllTagsController: TagsFindAllController = container.get('Apps.Backoffice.backend.controllers.TagsFindAllController');

  app.use('/product', ensureAuthenticated);

  app.get('/product', (req: Request, res: Response) => findAllProductController.run(req, res));

  app.get('/product/tag',(req: Request, res: Response) => findAllTagsController.run(req, res));

  app.get('/product/tag/new',(req: Request, res: Response) => {
    const id = uuid();
    
    res.status(200).render('products/new-tag', {
      id
    });
  });
}
