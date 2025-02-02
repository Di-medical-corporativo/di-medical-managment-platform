import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { UserId } from "../../../User/domain/UserId";
import { AttendanceId } from "../../domain/AttendanceId";
import { AttendanceIssue, AttendanceJustified, AttendanceUnjustified } from "../../domain/AttendanceIssue";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { AttendanceType } from "../../domain/AttendanceType";
import { Justification, JustificationActionUntaken } from "../../domain/Justification";
import { JustificationId } from "../../domain/JustificationId";
import { JustificationStatus, JustificationStatusEnum } from "../../domain/JustificationStatus";

export class PrismaAttendanceRepository implements AttendanceRepository {
  async saveIssue(issue: AttendanceUnjustified): Promise<void> {
    const issuePrimitves = issue.toPrimitives();

    await prisma.attendanceIssue.create({
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
      },
      orderBy: {
        date: 'desc'
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

  async findJustification(justificationId: JustificationId): Promise<Justification | null> {
    const justificationDB = await prisma.justification.findUnique({
      where: {
        id: justificationId.toString()
      }
    });

    if (justificationDB === null) {
      return null
    }

    let justification: JustificationActionUntaken = JustificationActionUntaken.fromPrimitives({
      createdAt: justificationDB.createdAt.toISOString(),
      id: justificationDB.id,
      reason: justificationDB.reason,
      status: justificationDB.status
    });

    return justification;
  }

  async changeStatus(justificantId: JustificationId, action: JustificationStatus, approverId: UserId): Promise<void> {
    await prisma.justification.update({
      where: {
        id: justificantId.toString()
      },
      data: {
        approver: {
          connect: {
            id: approverId.toString()
          }
        },
        status: action.toString()
      }
    })
  }

  async justify(justificationId: JustificationId, issueId: AttendanceId, reason: JustificationId): Promise<void> {
    await prisma.attendanceIssue.update({
      where: {
        id: issueId.toString()
      },
      data: {
        isJustified: true,
        justification: {
          create: {
            id: justificationId.toString(),
            reason: reason.toString(),
            status: JustificationStatusEnum.pending,
            createdAt: new Date().toISOString()
          }
        }
      }
    });
  }

  async findIssue(id: AttendanceId): Promise<AttendanceIssue | null> {
    const issueDB = await prisma.attendanceIssue.findFirst({
      where: {
        id: id.toString()
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
        }
      }
    });

    if (issueDB == null) {
      return null;
    }

    let attendanceIssue: AttendanceIssue;

    if (!issueDB.isJustified) {
      attendanceIssue = AttendanceUnjustified.fromPrimitives({
        date: issueDB.date.toISOString(),
        id: issueDB.id,
        type: issueDB.type as AttendanceType,
        issueUser: {
          firstName: issueDB.user.firstName,
          lastName: issueDB.user.lastName,
          job: issueDB.user.job,
          id: issueDB.user.id
        }
      });
    } else {
      if (issueDB.justification?.status == JustificationStatusEnum.pending) {
        attendanceIssue = AttendanceJustified.fromPrimitives({
          date: issueDB.date.toISOString(),
          id: issueDB.id,
          type: issueDB.type as AttendanceType,
          issueUser: {
            firstName: issueDB.user.firstName,
            lastName: issueDB.user.lastName,
            job: issueDB.user.job,
            id: issueDB.user.id
          },
          justification: {
            createdAt: issueDB.justification.createdAt.toDateString(),
            id: issueDB.justification.id,
            reason: issueDB.justification.reason,
            status: issueDB.justification.status
          }
        });
      } else {
        attendanceIssue = AttendanceJustified.fromPrimitives({
          date: issueDB.date.toISOString(),
          id: issueDB.id,
          type: issueDB.type as AttendanceType,
          issueUser: {
            firstName: issueDB.user.firstName,
            lastName: issueDB.user.lastName,
            job: issueDB.user.job,
            id: issueDB.user.id
          },
          justification: {
            createdAt: issueDB.justification?.createdAt.toDateString()!,
            id: issueDB.justification?.id!,
            reason: issueDB.justification?.reason!,
            status: issueDB.justification?.status!,
            approver: {
              firstName: issueDB.justification?.approver?.firstName!,
              lastName: issueDB.justification?.approver?.lastName!,
              id: issueDB.justification?.approver?.id!,
              job: issueDB.justification?.approver?.job!
            }
          }
        });
      }

    }

    return attendanceIssue;
  }

  async overview(userId: UserId): Promise<{ absence: number; delay: number; pendingJustifications: number; rejectedJustifications: number; approvedJustifications: number; }> {
    const [absence, delay, pending, approved, rejected] = await Promise.all([
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'absence-issue',
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
          status: 'pending-justification',
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'approved-justification',
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'rejected-justification',
        },
      }),
    ]);

    return {
      absence,
      delay,
      approvedJustifications: approved,
      pendingJustifications: pending,
      rejectedJustifications: rejected
    }
  }

  async delete(id: AttendanceId): Promise<void> {
    await prisma.attendanceIssue.delete({
      where: {
        id: id.toString()
      }
    });
  }
}
