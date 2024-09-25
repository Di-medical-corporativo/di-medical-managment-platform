import { Itinerary } from "../../domain/Itinerary";
import { ItineraryFinder } from "../../domain/ItineraryFinder";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryReport } from "../../domain/ItineraryReport";
import { ItineraryRepository } from "../../domain/ItineraryRepository";

export class ItineraryReporter {
  private itineraryFinder: ItineraryFinder;

  constructor(
    private repository: ItineraryRepository
  ) {
    this.itineraryFinder = new ItineraryFinder(repository);
  }

  async run(params: {
    id: ItineraryId
  }): Promise<ItineraryReport> {
    const itinerary: Itinerary = await this.itineraryFinder.run({
      id: params.id
    });

    const report: ItineraryReport = itinerary.buildReport();

    return report;
  }
}
