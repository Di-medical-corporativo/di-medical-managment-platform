import { ProductRepository } from "../../domain/ProductRepository";
import { TagId } from "../../domain/TagId";

export class TagDeletor {
  constructor(
    private repository: ProductRepository
  ) {}

  async run(params: {
    id: TagId
  }) {
    await this.ensureTagExists(params.id);

    await this.repository.deleteTag(params.id);
  }

  private async ensureTagExists(id: TagId) {
    await this.repository.findTag(id);
  }
}
