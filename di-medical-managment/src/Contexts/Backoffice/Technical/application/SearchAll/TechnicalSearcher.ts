import { Technical } from "../../domain/Technical";
import { TechnicalBrandId } from "../../domain/TechnicalBrandId";
import { TechnicalCode } from "../../domain/TechnicalCode";
import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class TechnicalSearcher {
  constructor(
    private repository: TechnicalRepository
  ) {}

  async run(params: {
    page: number,
    brand: TechnicalBrandId[],
    code: TechnicalCode[]
  }) {
    const technical = await this.repository.searchAll(
      params.page,
      params.brand,
      params.code
    );

    return technical;
  }
}
