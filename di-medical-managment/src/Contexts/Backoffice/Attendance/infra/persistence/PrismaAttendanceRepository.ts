import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { UserId } from "../../../User/domain/UserId";
import { AttendanceIssue, AttendanceJustified, AttendanceUnjustified } from "../../domain/AttendanceIssue";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { AttendanceType } from "../../domain/AttendanceType";
import { Justification } from "../../domain/Justification";
import { JustificationStatusEnum } from "../../domain/JustificationStatus";

export class PrismaAttendanceRepository implements AttendanceRepository {
  async saveIssue(issue: AttendanceUnjustified): Promise<void> {
    const issuePrimitves = issue.toPrimitives();

    prisma.attendanceIssue.create({
      data: {
        id: issuePrimitves.id,
        date: issuePrimitves.date,
        type: issuePrimitves.type,
        isJustified: issuePrimitves.isJustified,
        user: {
          connect: {
            id: issuePrimitves.issueUser.id
          }
        }
      }
    });
  }

  async findAll(userId: UserId): Promise<AttendanceIssue[]> {
    const issuesDB = await prisma.attendanceIssue.findMany({
      where: {
        userId: userId.toString()
      },
      include: {
        justification: {
          include: {
            approver: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                job: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            job: true
          }
        },
      }
    });

    const issues: AttendanceIssue[] = issuesDB.map(i => {
      let data = {
        id: i.id,
        type: i.type as AttendanceType,
        date: i.date.toISOString(),
        issueUser: {
          id: i.user.id,
          firstName: i.user.firstName,
          lastName: i.user.lastName,
          job: i.user.job
        }
      };

      if (!i.isJustified) {
        return AttendanceUnjustified.fromPrimitives(data);
      }

      let justification: {
        id: string;
        reason: string;
        status: string;
        createdAt: string;
        approver?: { id: string; firstName: string; lastName: string; job: string }
      }
        = {
        id: i.justification?.id!,
        reason: i.justification?.reason!,
        createdAt: i.justification?.createdAt.toString()!,
        status: i.justification?.status!,
        approver: {
          firstName: i.justification?.approver?.firstName!,
          lastName: i.justification?.approver?.lastName!,
          id: i.justification?.approver?.id!,
          job: i.justification?.approver?.job!
        }
      }


      return AttendanceJustified.fromPrimitives({
        ...data,
        justification
      });
    });

    return issues;
  }
}
