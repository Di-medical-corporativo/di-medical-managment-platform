import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class TaskGeneralReporter {
  constructor(
    private analyticsRepository: AnalyticsRepository
  ) {}

  async run(params: {
    from: FromDate,
    to: ToDate
  }) {
    const report = await this.analyticsRepository.taskGeneralReport(
      params.from,
      params.to
    );

    return report
  }
}
