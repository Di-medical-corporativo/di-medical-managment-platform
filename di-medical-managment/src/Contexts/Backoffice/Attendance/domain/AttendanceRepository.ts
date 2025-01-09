import { UserId } from "../../User/domain/UserId";
import { AttendanceIssue, AttendanceUnjustified } from "./AttendanceIssue";

export interface AttendanceRepository {
  saveIssue(issue: AttendanceUnjustified): Promise<void>
  findAll(userId: UserId): Promise<AttendanceIssue[]>
}
