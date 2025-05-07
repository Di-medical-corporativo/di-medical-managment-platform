import { TagId } from "./TagId";
import { TagName } from "./TagName";

export class Tag {
  constructor(
    private id: TagId,
    private name: TagName
  ) {}

  static fromPrimitives(params: {
    id: string;
    name: string;
  }) {
    return new Tag(
      new TagId(params.id),
      new TagName(params.name)
    );
  }

  static create(params: {
    id: TagId,
    name: TagName
  }) {
    return new Tag(
      params.id,
      params.name
    )
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString()
    }
  }
}
