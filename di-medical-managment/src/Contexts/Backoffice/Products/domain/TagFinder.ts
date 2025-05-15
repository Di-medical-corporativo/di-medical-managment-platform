import { ProductRepository } from "./ProductRepository";
import { Tag } from "./Tag";
import { TagId } from "./TagId";
import { TagNotFound } from "./TagNotFound";

export class TagFinder {
  constructor(
    private repository: ProductRepository
  ) {}

  async run(params: {
    id: TagId
  }) {
    const tag: Tag | null = await this.repository.findTag(params.id);

    if(!tag) {
      throw new TagNotFound();
    }

    return tag;
  }
}
