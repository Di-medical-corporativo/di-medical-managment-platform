import { AttendanceDate } from "./AttendanceDate";
import { AttendanceId } from "./AttendanceId";
import { AttendanceType } from "./AttendanceType";
import { AttendanceUser } from "./AttendanceUser";

export class AttendanceIssue {
  constructor(
    private id: AttendanceId,
    private type: AttendanceType,
    private date: AttendanceDate,
    private issueUser: AttendanceUser
  ) {}
}
