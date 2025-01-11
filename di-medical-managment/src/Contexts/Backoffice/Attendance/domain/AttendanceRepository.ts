import { UserId } from "../../User/domain/UserId";
import { AttendanceId } from "./AttendanceId";
import { AttendanceIssue, AttendanceUnjustified } from "./AttendanceIssue";
import { Justification } from "./Justification";
import { JustificationId } from "./JustificationId";
import { JustificationStatus } from "./JustificationStatus";

export interface AttendanceRepository {
  justify(justificationId: JustificationId, issueId: AttendanceId, reason: JustificationId): Promise<void>;
  changeStatus(justificantId: JustificationId, action: JustificationStatus, approverId: UserId): Promise<void>;
  saveIssue(issue: AttendanceUnjustified): Promise<void>
  findAll(userId: UserId): Promise<AttendanceIssue[]>
  findJustification(justificationId: JustificationId): Promise<Justification | null>
}
