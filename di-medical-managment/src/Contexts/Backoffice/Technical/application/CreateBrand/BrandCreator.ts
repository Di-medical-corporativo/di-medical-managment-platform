import { TechnicalBrand } from "../../domain/TechnicalBrand";
import { TechnicalBrandId } from "../../domain/TechnicalBrandId";
import { TechnicalBrandName } from "../../domain/TechnicalBrandName";
import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class BrandCreator {
  constructor(
    private repository: TechnicalRepository
  ) {}

  async run(params: {
    id: TechnicalBrandId,
    name: TechnicalBrandName
  }) {
    const brand = TechnicalBrand.create({
      id: params.id,
      name: params.name
    });

    await this.repository.createBrand(brand);
  }
}
 