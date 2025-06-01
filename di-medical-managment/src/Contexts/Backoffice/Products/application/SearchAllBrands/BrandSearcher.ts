import { Brand } from "../../domain/Brand";
import { ProductRepository } from "../../domain/ProductRepository";

export class BrandSearcher {
  constructor(
    private repository: ProductRepository
  ) {}

  async run(): Promise<Brand[]> {
    const brands: Brand[] = await this.repository.findAllBrands();
  
    return brands;
  }
}
