import { ProductRepository } from "../../domain/ProductRepository";
import { Tag } from "../../domain/Tag";
import { TagId } from "../../domain/TagId";
import { TagName } from "../../domain/TagName";

export class TagCreator {
  constructor(
    private repository: ProductRepository
  ) {}

  async run(params: {
    id: TagId,
    name: TagName
  }) {
    const tag: Tag = Tag.create(params);

    await this.repository.createTag(tag);
  }
}
