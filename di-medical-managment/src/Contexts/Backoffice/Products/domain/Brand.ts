import { BrandId } from "./BrandId";
import { BrandName } from "./BrandName";

export class Brand {
  constructor(
    private id: BrandId,
    private name: BrandName
  ) {}

  static create(params: {
    id: BrandId,
    name: BrandName
  }) {
    return new Brand(
      params.id,
      params.name
    )
  }

  static fromPrimitives(params: {
    id: string;
    name: string;
  }) {
    return new Brand(
      new BrandId(params.id),
      new BrandName(params.name)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString()
    }
  }
}
