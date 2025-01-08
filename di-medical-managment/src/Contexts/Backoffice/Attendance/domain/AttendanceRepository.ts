import { AttendanceUnjustified } from "./AttendanceIssue";

export interface AttendanceRepository {
  saveIssue(issue: AttendanceUnjustified): Promise<void>
}
