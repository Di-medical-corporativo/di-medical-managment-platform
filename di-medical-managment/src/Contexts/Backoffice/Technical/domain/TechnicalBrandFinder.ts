import { BrandNotFound } from "./BrandNotFound";
import { TechnicalBrand } from "./TechnicalBrand";
import { TechnicalBrandId } from "./TechnicalBrandId";
import { TechnicalRepository } from "./TechnicalRepository";

export class TechnicalBrandFinder {
  constructor(
    private repository: TechnicalRepository
  ) {}

  async run(params: {
    id: TechnicalBrandId
  }) {
    const brand: TechnicalBrand | null = await this.repository.searchBrand(
      params.id
    );

    if(!brand) throw new BrandNotFound();

    return brand;
  }
}
