import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class ItineraryGeneralReporter {
  constructor(
    private repository: AnalyticsRepository
  ) {}

  async run(params: {
    from: FromDate,
    to: ToDate
  }) {
    const report = await this.repository.itineraryGeneralReport(
      params.from,
      params.to
    );

    return report;
  }
}
