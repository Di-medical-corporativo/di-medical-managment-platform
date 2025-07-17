import { Technical } from "../../domain/Technical";
import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class TechnicalSearcher {
  constructor(
    private repository: TechnicalRepository
  ) {}

  async run() {
    const technical: Technical[] = await this.repository.searchAll();

    return technical;
  }
}
