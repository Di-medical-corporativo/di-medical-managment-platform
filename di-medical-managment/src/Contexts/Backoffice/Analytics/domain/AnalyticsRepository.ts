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
    rejectedPermitCount: number,
    assignedTaskCount: number,
    inProgressTaskCount: number,
    completedTaskCount: number,
    pastDueTaskCount: number,
    pointDoneTotalCount: number,
    pointProblemTotalCount: number
  }>

  itineraryGeneralReport(from: FromDate, toDate: ToDate): Promise<{
    totalItineraryCount: number,
    totalPointsCount: number,
    totalPointProblemCount: number,
    averagePointPerItinerary: number | string,
    topFiveOperators: { fullName: string; totalPoints: number }[];
    topFiveClients: { name: string; totalPoints: number }[];
    routePointCount: number;
    parcelPointCount: number;
    collectPointCount: number;
    aggregatedPointsByDate: Record<string, number>;
    pointAnswerSurveyCount: number;
    invoiceCount: number;
    averageInvoicePerPoint: number | string;
    averageErrorPointPerItinerary: string | number;
  }>

  pointPerPersonGeneral(from: FromDate, to: ToDate): Promise<{ fullName: string; goodPoints: number; badPoints: number; totalPoints: number }[]>

  attendanceGeneralReport(from: FromDate, to: ToDate): Promise<{
    fullName: string;
    job: string;
    absenceCount: number;
    delayCount: number;
  }[]>

  taskGeneralReport(from: FromDate, to: ToDate): Promise<{
    topTenMostTasks: {
      fullName: string,
      total: number
    }[],
    topTenLeastTasks: {
      fullName: string,
      total: number
    }[],
    topTenMostDueTasks: {
      fullName: string,
      total: number
    }[],
    asignedCount: number,
    inProgressCount: number,
    finishedCount: number,
    dueCount: number
  }>
}
