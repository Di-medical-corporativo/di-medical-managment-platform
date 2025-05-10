import { ProductRepository } from "../../domain/ProductRepository";
import { Tag } from "../../domain/Tag";

export class TagSearcher {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async run() {
    const tags: Tag[] = await this.productRepository.findAllTags();

    return tags;
  }
}
