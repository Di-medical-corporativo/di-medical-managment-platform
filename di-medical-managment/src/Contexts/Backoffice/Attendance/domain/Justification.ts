import { AttendanceDate } from "./AttendanceDate";
import { JustificationDate } from "./JustificationDate";
import { JustificationId } from "./JustificationId";
import { JustificationReason } from "./JustificationReason";
import { JustificationStatus } from "./JustificationStatus";

export abstract class Justification {
  constructor(
    private id: JustificationId,
    private reason: JustificationReason,
    private status: JustificationStatus,
    private createdAt: JustificationDate
  ) {}
}

export class JustificationActionTaken extends Justification {
  constructor(
    id: JustificationId,
    reason: JustificationReason,
    status: JustificationStatus,
    createdAt: JustificationDate
  ) {
    super(
      id,
      reason,
      status,
      createdAt
    );
  }

  
}
