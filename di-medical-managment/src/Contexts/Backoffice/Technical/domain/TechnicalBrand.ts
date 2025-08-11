import { TechnicalBrandId } from "./TechnicalBrandId";
import { TechnicalBrandName } from "./TechnicalBrandName";

export class TechnicalBrand {
  private total: number = 0;

  constructor(
    private id: TechnicalBrandId,
    private name: TechnicalBrandName
  ) {}

  public setTotal(total: number) {
    this.total = total;
  }

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
      name: this.name.toString(),
      total: this.total
    }
  }
}
