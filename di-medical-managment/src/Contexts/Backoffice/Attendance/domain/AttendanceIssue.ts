import { AttendanceDate } from "./AttendanceDate";
import { AttendanceId } from "./AttendanceId";
import { AttendanceType } from "./AttendanceType";
import { AttendanceUser } from "./AttendanceUser";

export abstract class AttendanceIssue {
  constructor(
    protected id: AttendanceId,
    protected type: AttendanceType,
    protected date: AttendanceDate,
    protected issueUser: AttendanceUser
  ) {}

  abstract toPrimitives(): {};
}

export class AttendanceJustified extends AttendanceIssue {
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

  toPrimitives(): {} {
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

  toPrimitives(): {} {
    return {
      id: this.id.toString(),
      type: this.type,
      date: this.date.toString(),
      issueUser: this.issueUser.toPrimitives(),
      isJustified: true
    }
  }
}
