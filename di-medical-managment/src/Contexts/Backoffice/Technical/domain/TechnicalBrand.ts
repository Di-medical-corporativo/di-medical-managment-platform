import { TechnicalBrandId } from "./TechnicalBrandId";
import { TechnicalBrandName } from "./TechnicalBrandName";

export class TechnicalBrand {
  constructor(
    private id: TechnicalBrandId,
    private name: TechnicalBrandName
  ) {}

  static create(params: {
    id: TechnicalBrandId,
    name: TechnicalBrandName
  }) {
    return new TechnicalBrand(
      params.id,
      params.name
    );
  }

  static fromPrimitives(params: {
    id: string;
    name: string;
  }) {
    return new TechnicalBrand(
      new TechnicalBrandId(params.id),
      new TechnicalBrandName(params.name)
    );
  }
  
  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString()
    }
  }
}
