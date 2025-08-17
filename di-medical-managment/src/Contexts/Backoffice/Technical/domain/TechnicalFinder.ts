import { Technical } from "./Technical";
import { TechnicalId } from "./TechnicalId";
import { TechnicalNotFound } from "./TechnicalNotFound";
import { TechnicalRepository } from "./TechnicalRepository";

export class TechnicalFinder {
  constructor(
    private repository: TechnicalRepository
  ) {}

  async run(params: {
    id: TechnicalId
  }) {
    const technical: Technical | null = await this.repository.findById(params.id);

    if(!technical) {
      throw new TechnicalNotFound();
    }

    return technical;
  }
}
