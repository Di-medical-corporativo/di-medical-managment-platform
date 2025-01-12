import { AttendanceId } from "./AttendanceId";
import { AttendanceIssue } from "./AttendanceIssue";
import { AttendanceNotFound } from "./AttendanceNotFound";
import { AttendanceRepository } from "./AttendanceRepository";

export class IssueFinder {
  constructor(
    private attendanceRepository: AttendanceRepository
  ) {}

  async run(params: {
    id: AttendanceId
  }) {
    const issue: AttendanceIssue | null = await this.attendanceRepository.findIssue(params.id);

    if(issue == null) {
      throw new AttendanceNotFound();
    }

    return issue;
  }
}
