import { ItineraryFinder } from "../../domain/ItineraryFinder";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryRepository } from "../../domain/ItineraryRepository";

export class ItineraryStarter {
  private itineraryFinder: ItineraryFinder;
  
  constructor(
    private repository: ItineraryRepository
  ) {
    this.itineraryFinder = new ItineraryFinder(repository);
  }

  async run(params: {
    id: ItineraryId
  }) {
    await this.ensureItineraryExists(params.id);

    await this.repository.start(params.id);
  }

  private async ensureItineraryExists(id: ItineraryId) {
    await this.itineraryFinder.run({
      id
    });
  }
}
