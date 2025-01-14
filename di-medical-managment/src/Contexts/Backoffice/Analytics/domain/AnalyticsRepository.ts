import { UserId } from "../../User/domain/UserId";
import { FromDate } from "./FromDate";
import { ToDate } from "./ToDate";

export interface AnalyticsRepository {
  userGeneralReport(userId: UserId, from: FromDate, toDate: ToDate): Promise<{
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
    rejectedPermitCount: number
  }>
}
