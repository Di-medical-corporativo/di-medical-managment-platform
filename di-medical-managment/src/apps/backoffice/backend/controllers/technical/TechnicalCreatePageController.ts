import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { TechnicalBrand } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalBrand";
import { BrandSearcher } from "../../../../../Contexts/Backoffice/Technical/application/SearchAllBrand/BrandSearcher";

export class TechnicalCreatePageController {
  constructor(
    private brandSearcher: BrandSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const id = uuid();

      const brands: TechnicalBrand[] = await this.brandSearcher.run();

      res.status(200).render('technical/new', {
        brands: brands.map(b => b.toPrimitives()),
        id
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
