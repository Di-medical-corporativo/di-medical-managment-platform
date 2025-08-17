import { TechnicalFinder } from "../../domain/TechnicalFinder";
import { TechnicalId } from "../../domain/TechnicalId";
import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class TechnicalDeletor {
  private technicalFinder: TechnicalFinder;

  constructor(
    private repository: TechnicalRepository
  ) {
    this.technicalFinder = new TechnicalFinder(repository);
  }

  async run(params: {
    id: TechnicalId
  }) {
    await this.ensureTechnicalExists(params.id);

    await this.repository.delete(params.id);
  }

  private async ensureTechnicalExists(id: TechnicalId) {
    await this.technicalFinder.run({
      id
    });
  }
}
