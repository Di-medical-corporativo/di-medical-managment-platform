import { AttendanceDate } from "./AttendanceDate";
import { AttendanceId } from "./AttendanceId";
import { AttendanceType } from "./AttendanceType";
import { AttendanceUser } from "./AttendanceUser";
import { Justification, JustificationActionTaken, JustificationActionUntaken } from "./Justification";
import { JustificationStatusEnum } from "./JustificationStatus";

export abstract class AttendanceIssue {
  constructor(
    protected id: AttendanceId,
    protected type: AttendanceType,
    protected date: AttendanceDate,
    protected issueUser: AttendanceUser
  ) { }

  abstract toPrimitives(): { id: string; type: string; date: string; issueUser: { id: string; firstName: string; lastName: string; } };
}

export class AttendanceJustified extends AttendanceIssue {
  constructor(
    id: AttendanceId,
    type: AttendanceType,
    date: AttendanceDate,
    issueUser: AttendanceUser,
    private justification: Justification
  ) {
    super(
      id,
      type,
      date,
      issueUser
    );
  }

  static create(params: {
    id: AttendanceId,
    type: AttendanceType,
    date: AttendanceDate,
    issueUser: AttendanceUser,
    justification: Justification
  }) {
    return new AttendanceJustified(
      params.id,
      params.type,
      params.date,
      params.issueUser,
      params.justification
    );
  }

  static fromPrimitives(params: {
    id: string;
    type: AttendanceType;
    date: string;
    issueUser: {
      id: string;
      firstName: string;
      lastName: string;
      job: string;
    };
    justification: {
      id: string;
      reason: string;
      status: string;
      createdAt: string;
      approver?: {
        id: string;
        firstName: string;
        lastName: string;
        job: string;
      };
    }
  }) {
    let justification: Justification;

    if(params.justification.status == JustificationStatusEnum.pending) {
      justification = JustificationActionUntaken.fromPrimitives({
        createdAt: params.justification.createdAt,
        id: params.justification.id,
        reason: params.justification.reason,
        status: params.justification.status
      })
    } else {
      justification = JustificationActionTaken.fromPrimitives({
        createdAt: params.justification.createdAt,
        id: params.justification.id,
        reason: params.justification.reason,
        status: params.justification.status,
        approver: {
          firstName: params.justification.approver?.firstName!,
          id: params.justification.approver?.id!,
          job: params.justification.approver?.job!,
          lastName: params.justification.approver?.lastName!
        }
      })
    }

    return new AttendanceJustified(
      new AttendanceId(params.id),
      params.type,
      new AttendanceDate(params.date),
      AttendanceUser.fromPrimitives(params.issueUser),
      justification
    );
  }

  toPrimitives(): { id: string; type: string; date: string; issueUser: { id: string; firstName: string; lastName: string; } } & { isJustified: boolean } {
    return {
      id: this.id.toString(),
      type: this.type,
      date: this.date.toString(),
      issueUser: this.issueUser.toPrimitives(),
      isJustified: false
    }
  }
}

export class AttendanceUnjustified extends AttendanceIssue {
  constructor(
    id: AttendanceId,
    type: AttendanceType,
    date: AttendanceDate,
    issueUser: AttendanceUser
  ) {
    super(
      id,
      type,
      date,
      issueUser
    );
  }

  static create(params: {
    id: AttendanceId,
    type: AttendanceType,
    date: AttendanceDate,
    issueUser: AttendanceUser
  }) {
    return new AttendanceUnjustified(
      params.id,
      params.type,
      params.date,
      params.issueUser
    );
  }

  static fromPrimitives(params: {
    id: string;
    type: AttendanceType;
    date: string;
    issueUser: {
      id: string;
      firstName: string;
      lastName: string;
      job: string;
    };
  }) {
    return new AttendanceUnjustified(
      new AttendanceId(params.id),
      params.type,
      new AttendanceDate(params.date),
      AttendanceUser.fromPrimitives(params.issueUser)
    );
  }

  toPrimitives(): { id: string; type: string; date: string; issueUser: { id: string; firstName: string; lastName: string; } } & { isJustified: boolean } {
    return {
      id: this.id.toString(),
      type: this.type,
      date: this.date.toString(),
      issueUser: this.issueUser.toPrimitives(),
      isJustified: true
    }
  }
}
