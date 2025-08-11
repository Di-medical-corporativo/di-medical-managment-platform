import { Request, Response } from "express";
import { BrandCreator } from "../../../../../Contexts/Backoffice/Products/application/CreateBrand/BrandCreator";
import { BrandId } from "../../../../../Contexts/Backoffice/Products/domain/BrandId";
import { TechnicalBrandId } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalBrandId";
import { TechnicalBrandName } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalBrandName";

export class TechnicalBrandCreateController {
  constructor(
    private brandCreator: BrandCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      await this.brandCreator.run({
        id: new TechnicalBrandId(id),
        name: new TechnicalBrandName(name)
      });

      res.redirect('/backoffice/technical/brand');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
