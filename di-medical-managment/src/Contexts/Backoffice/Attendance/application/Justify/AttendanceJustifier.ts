import { AttendanceId } from "../../domain/AttendanceId";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { JustificationId } from "../../domain/JustificationId";

export class AttendanceJustifier {
  constructor(
    private repository: AttendanceRepository
  ) {}

  async run(params: {
    justificationId: JustificationId,
    issueId: AttendanceId,
    reason: JustificationId
  }) {
    await this.repository.justify(params.justificationId, params.issueId, params.reason);
  }
}
