import { AttendanceDate } from "../../domain/AttendanceDate";
import { AttendanceId } from "../../domain/AttendanceId";
import { AttendanceUnjustified } from "../../domain/AttendanceIssue";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { AttendanceType } from "../../domain/AttendanceType";
import { AttendanceUser } from "../../domain/AttendanceUser";

export class IssueCreator {
  constructor(
    private repository: AttendanceRepository
  ) {}

  async run(params: {
    id: AttendanceId,
    type: AttendanceType,
    date: AttendanceDate,
    issueUser: AttendanceUser
  }) {
    const issue: AttendanceUnjustified = AttendanceUnjustified.create({
      date: params.date,
      id: params.id,
      issueUser: params.issueUser,
      type: params.type
    });

    await this.repository.saveIssue(issue);
  }
}
