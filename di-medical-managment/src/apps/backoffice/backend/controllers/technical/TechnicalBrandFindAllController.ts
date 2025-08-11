import { Request, Response } from "express";
import { BrandSearcher } from "../../../../../Contexts/Backoffice/Technical/application/SearchAllBrand/BrandSearcher";
import { TechnicalBrand } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalBrand";

export class TechnicalBrandFindAllController {
  constructor(
    private brandSearcher: BrandSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const brands: TechnicalBrand[] = await this.brandSearcher.run();

      return res.status(200).render('technical/brands', {
        brands: brands.map(b => b.toPrimitives())
      });
    } catch (error) {
      return res.status(500).render('error/error', {
        message: 'Ocurrio un error, contaca soporte'
      });
    }
  }
}
