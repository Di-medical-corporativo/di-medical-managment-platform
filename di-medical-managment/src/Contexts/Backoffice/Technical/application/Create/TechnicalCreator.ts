import { Technical } from "../../domain/Technical";
import { TechnicalBrandFinder } from "../../domain/TechnicalBrandFinder";
import { TechnicalBrandId } from "../../domain/TechnicalBrandId";
import { TechnicalCode } from "../../domain/TechnicalCode";
import { TechnicalId } from "../../domain/TechnicalId";
import { TechnicalImage } from "../../domain/TechnicalImage";
import { TechnicalName } from "../../domain/TechnicalName";
import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class TechnicalCreator {
  private brandFinder: TechnicalBrandFinder;
  constructor(
    private repository: TechnicalRepository
  ) {
    this.brandFinder = new TechnicalBrandFinder(repository);
  }

  async run(params: {
    id: TechnicalId,
    name: TechnicalName,
    brand: TechnicalBrandId,
    codes: TechnicalCode[],
    imageUrl: TechnicalImage
  }) {
    const brand = await this.brandFinder.run({
      id: params.brand
    });

    const technical: Technical = Technical.create({
      brand,
      codes: params.codes,
      id: params.id,
      imageUrl: params.imageUrl,
      name: params.name
    });

    await this.repository.create(technical);
  }
}
