import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { AttendanceIssue, AttendanceUnjustified } from "../../domain/AttendanceIssue";
import { AttendanceRepository } from "../../domain/AttendanceRepository";

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
}
