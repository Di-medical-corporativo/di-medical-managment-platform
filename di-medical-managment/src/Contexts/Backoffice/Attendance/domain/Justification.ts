import { AttendanceDate } from "./AttendanceDate";
import { AttendanceUser } from "./AttendanceUser";
import { JustificationDate } from "./JustificationDate";
import { JustificationId } from "./JustificationId";
import { JustificationReason } from "./JustificationReason";
import { JustificationStatus } from "./JustificationStatus";

export abstract class Justification {
  constructor(
    protected id: JustificationId,
    protected reason: JustificationReason,
    protected status: JustificationStatus,
    protected createdAt: JustificationDate
  ) {}
}

export class JustificationActionTaken extends Justification {
  constructor(
    id: JustificationId,
    reason: JustificationReason,
    status: JustificationStatus,
    createdAt: JustificationDate,
    approver: AttendanceUser
  ) {
    super(
      id,
      reason,
      status,
      createdAt
    );
    this.approver = approver;
  }

  private approver: AttendanceUser;

  toPrimitives() {
    return {
      id: this.id.toString(),
      reason: this.reason.toString(),
      status: this.status,
      createdAt: this.createdAt.toString(),
      approver: this.approver.toString()
    };
  }

  static create(
    params: {
      id: JustificationId,
      reason: JustificationReason,
      status: JustificationStatus,
      createdAt: JustificationDate,
      approver: AttendanceUser
    }
  ): JustificationActionTaken {
    return new JustificationActionTaken(
      params.id, 
      params.reason, 
      params.status, 
      params.createdAt, 
      params.approver
    );
  }

  static fromPrimitives(primitives: {
    id: string;
    reason: string;
    status: string;
    createdAt: string;
    approver: {
      id: string;
      firstName: string;
      lastName: string;
      job: string;
    };
  }): JustificationActionTaken {
    return new JustificationActionTaken(
      new JustificationId(primitives.id),
      new JustificationReason(primitives.reason),
      new JustificationStatus(primitives.status),
      new JustificationDate(primitives.createdAt),
      AttendanceUser.fromPrimitives(primitives.approver)
    );
  }
}

export class JustificationActionUntaken extends Justification {
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

  toPrimitives() {
    return {
      id: this.id.toString(),
      reason: this.reason.toString(),
      status: this.status,
      createdAt: this.createdAt.toString()
    };
  }

  static create(
    params: {
      id: JustificationId,
      reason: JustificationReason,
      status: JustificationStatus,
      createdAt: JustificationDate,
    }
  ): JustificationActionUntaken {
    return new JustificationActionUntaken(
      params.id, 
      params.reason, 
      params.status, 
      params.createdAt, 
    );
  }

  static fromPrimitives(primitives: {
    id: string;
    reason: string;
    status: string;
    createdAt: string;
  }): JustificationActionUntaken {
    return new JustificationActionUntaken(
      new JustificationId(primitives.id),
      new JustificationReason(primitives.reason),
      new JustificationStatus(primitives.status),
      new JustificationDate(primitives.createdAt)
    );
  }
}
