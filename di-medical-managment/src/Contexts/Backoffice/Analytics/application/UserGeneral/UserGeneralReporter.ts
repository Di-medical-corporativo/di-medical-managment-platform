import { UserId } from "../../../User/domain/UserId";
import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class UserGeneralReporter {
  constructor(
    private repository: AnalyticsRepository
  ) {}

  async run(params: {
    userId: UserId,
    fromDate: FromDate,
    toDate: ToDate
  }) {
    const report = await this.repository.userGeneralReport(
      params.userId,
      params.fromDate,
      params.toDate
    );

    return report;
  }
}
