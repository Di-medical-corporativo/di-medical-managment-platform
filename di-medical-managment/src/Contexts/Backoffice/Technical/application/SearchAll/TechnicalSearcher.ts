import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class TechnicalSearcher {
  constructor(
    private repository: TechnicalRepository
  ) {}

  async run(params: {
    page: number,
    term: string
  }) {
    const technical = await this.repository.searchAll(
      params.page,
      params.term
    );

    return technical;
  }
}
