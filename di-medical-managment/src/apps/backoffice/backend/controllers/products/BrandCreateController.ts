import { Request, Response } from "express";
import { BrandCreator } from "../../../../../Contexts/Backoffice/Products/application/CreateBrand/BrandCreator";
import { BrandId } from "../../../../../Contexts/Backoffice/Products/domain/BrandId";
import { BrandName } from "../../../../../Contexts/Backoffice/Products/domain/BrandName";

export class BrandCreateController {
  constructor(
    private brandCreator: BrandCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      await this.brandCreator.run({
        id: new BrandId(id),
        name: new BrandName(name)
      });

      res.redirect('/backoffice/product/brand');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
