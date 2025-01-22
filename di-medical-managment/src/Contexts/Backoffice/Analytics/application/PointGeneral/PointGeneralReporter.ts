import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class PointGeneralReporter {
  constructor(
    private repository: AnalyticsRepository
  ) {}

  async run(params: {
    from: FromDate, 
    to: ToDate
  }) {
    const report = await this.repository.pointPerPersonGeneral(
      params.from,
      params.to
    );

    return report;
  }
}
