import { AttendanceId } from "../../domain/AttendanceId";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { IssueFinder } from "../../domain/IssueFinder";
import { JustificationId } from "../../domain/JustificationId";

export class AttendanceJustifier {
  private issueFinder: IssueFinder;

  constructor(
    private repository: AttendanceRepository,
  ) {
    this.issueFinder = new IssueFinder(repository);
  }

  async run(params: {
    justificationId: JustificationId,
    issueId: AttendanceId,
    reason: JustificationId
  }) {
    await this.ensureIssueExists(params.issueId);

    await this.repository.justify(params.justificationId, params.issueId, params.reason);
  }

  private async ensureIssueExists(id: AttendanceId) {
    await this.issueFinder.run({
      id
    });
  }
}
