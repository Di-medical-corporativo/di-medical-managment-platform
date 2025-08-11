import { TechnicalBrand } from "../../domain/TechnicalBrand";
import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class BrandSearcher {
  constructor(
    private repository: TechnicalRepository
  ) {}

  async run() {
    const brands: TechnicalBrand[] = await this.repository.findAllBrands();

    return brands;
  }
}
