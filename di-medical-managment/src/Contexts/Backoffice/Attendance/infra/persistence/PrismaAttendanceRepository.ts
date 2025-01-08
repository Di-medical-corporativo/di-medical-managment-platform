import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { AttendanceIssue, AttendanceUnjustified } from "../../domain/AttendanceIssue";
import { AttendanceRepository } from "../../domain/AttendanceRepository";

export class PrismaAttendanceRepository implements AttendanceRepository {
  async saveIssue(issue: AttendanceUnjustified): Promise<void> {
    const issuePrimitves = issue.toPrimitives();    
  }
}
