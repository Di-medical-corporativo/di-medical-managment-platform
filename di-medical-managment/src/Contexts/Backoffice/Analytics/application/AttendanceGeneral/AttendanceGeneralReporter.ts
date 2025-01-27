import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class AttendanceGeneralReporter {
  constructor(
    private repository: AnalyticsRepository
  ) {}

  async run(params: {
    from: FromDate,
    to: ToDate
  }) {
    const report = await this.repository.attendanceGeneralReport(
      params.from,
      params.to
    );

    return report;
  }
}
