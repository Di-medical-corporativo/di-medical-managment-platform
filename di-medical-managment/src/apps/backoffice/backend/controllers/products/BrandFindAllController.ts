import { Request, Response } from "express";
import { BrandSearcher } from "../../../../../Contexts/Backoffice/Products/application/SearchAllBrands/BrandSearcher";
import { Brand } from "../../../../../Contexts/Backoffice/Products/domain/Brand";

export class BrandFindAllController {
  constructor(
    private brandFinder: BrandSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const brands: Brand[] = await this.brandFinder.run();

      res.status(200).render('products/brands', {
        brands: brands.map(b => b.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
