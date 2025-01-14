import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { UserId } from "../../../User/domain/UserId";
import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class PrismaAnalyticsRepository implements AnalyticsRepository {
  async userGeneralReport(userId: UserId, from: FromDate, toDate: ToDate): Promise<{
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
  }> {

    const [
      absenceCount,
      delayCount,
      justificationApprovedCount,
      justificationPendingCount,
      justificationRejectedCount,
      absenceTotalCount,
      delayTotalCount,
      groupedAssitenceIssuesCount,
      vacationPermitCount,
      sickPermitCount,
      personalPermitCount,
      pendingPermitCount,
      approvedPermitCount,
      rejectedPermitCount
    ] = await Promise.all([
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'absence-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          },
          OR: [
            { isJustified: false },
            {
              isJustified: true,
              justification: {
                status: { in: ['pending-justification', 'rejected-justification'] },
              },
            },
          ],
        },
      }),
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'delay-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          },
          OR: [
            { isJustified: false },
            {
              isJustified: true,
              justification: {
                status: { in: ['pending-justification', 'rejected-justification'] },
              },
            },
          ],
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'approved-justification',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'pending-justification',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'rejected-justification',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'absence-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'delay-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.attendanceIssue.groupBy({
        by: ['date'],
        _count: {
          id: true
        },
        where: {
          userId: userId.toString(),
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
        orderBy: {
          date: 'asc'
        }
      }),

      // PERMITS
      prisma.permit.count({
        where: {
          type: 'vacation-permit',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          type: 'sick-permit',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          type: 'personal-permit',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          status: 'pending-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          status: 'approved-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          status: 'rejected-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
    ]);

    let shouldGroupBy = from.daysDifferenceWith(toDate) < 30 ? 'day' : 'month';

    let issuesGroupedByDate = groupedAssitenceIssuesCount.reduce<Record<string, number>>((acc, issue) => {
      let key: string;

      if (shouldGroupBy == 'day') {
        key = issue.date.toLocaleDateString('es-MX');
      } else {
        const month = issue.date.getMonth() + 1;
        const year = issue.date.getFullYear();

        key = `${year}-${month.toString().padStart(2, '0')}`;
      }

      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] += issue._count.id;

      return acc;
    }, {});

    return {
      absenceCount,
      delayCount,
      justificationApprovedCount,
      justificationPendingCount,
      justificationRejectedCount,
      absenceTotalCount,
      delayTotalCount,
      issuesGroupedByDate,
      vacationPermitCount,
      sickPermitCount,
      personalPermitCount,
      pendingPermitCount,
      approvedPermitCount,
      rejectedPermitCount
    }
  }
}
