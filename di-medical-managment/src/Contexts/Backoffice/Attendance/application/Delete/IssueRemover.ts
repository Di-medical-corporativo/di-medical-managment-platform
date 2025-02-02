import { AttendanceId } from "../../domain/AttendanceId";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { IssueFinder } from "../../domain/IssueFinder";

export class IssueRemover {
  private issueFinder: IssueFinder;

  constructor(
    private attendanceRepository: AttendanceRepository
  ) {
    this.issueFinder = new IssueFinder(attendanceRepository);
  }

  async run(params: {
    id: AttendanceId
  }) {
    await this.ansureIssueExists(params.id);

    await this.attendanceRepository.delete(params.id);
  }

  private async ansureIssueExists(id: AttendanceId) {
    await this.issueFinder.run({
      id
    });
  }
}
