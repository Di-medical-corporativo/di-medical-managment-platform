import { User } from "../../../User/domain/User";
import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class UserGeneralReporter {
  private userFinder: UserFinder;

  constructor(
    private repository: AnalyticsRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(params: {
    userId: UserId,
    fromDate: FromDate,
    toDate: ToDate
  }): Promise<{
    absenceCount: number,
    delayCount: number,
    justificationApprovedCount: number,
    justificationPendingCount: number,
    justificationRejectedCount: number,
    absenceTotalCount: number,
    delayTotalCount: number,
    issuesGroupedByDate: Record<string, number>,
    vacationPermitCount: number,
    sickPermitCount: number,
    personalPermitCount: number,
    pendingPermitCount: number,
    approvedPermitCount: number,
    rejectedPermitCount: number,
    assignedTaskCount: number,
    inProgressTaskCount: number,
    completedTaskCount: number,
    pastDueTaskCount: number,
    pointDoneTotalCount: number,
    pointProblemTotalCount: number,
    firstName: string;
    lastName: string;
    job: string;
  }> {
    const user: User = await this.userFinder.run(params.userId.toString());

    const { firstName, lastName, job } = user.toPrimitives();

    const report = await this.repository.userGeneralReport(
      params.userId,
      params.fromDate,
      params.toDate
    );

    return {
      ...report,
      firstName,
      lastName,
      job
    };
  }
}
