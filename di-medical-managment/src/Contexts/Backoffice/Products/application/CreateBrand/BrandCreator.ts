import { Brand } from "../../domain/Brand";
import { BrandId } from "../../domain/BrandId";
import { BrandName } from "../../domain/BrandName";
import { ProductRepository } from "../../domain/ProductRepository";

export class BrandCreator {
  constructor(
    private repository: ProductRepository
  ) {}

  async run(params: {
    id: BrandId,
    name: BrandName
  }) {
    const brand = Brand.create({
      id: params.id,
      name: params.name
    });

    await this.repository.createBrand(brand);
  }
}
