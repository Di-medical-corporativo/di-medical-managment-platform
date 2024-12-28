import { UserId } from "../../User/domain/UserId";
import { PermitAdminComment } from "./PermitComment";
import { PermitDate } from "./PermitDate";
import { PermitId } from "./PermitId";
import { PermitReason } from "./PermitReason";
import { PermitStatus, PermitStatusList } from "./PermitStatus";
import { PermitType } from "./PermitType";
import { PermitUser } from "./PermitUser";

export abstract class Permit {
  constructor(
    protected id: PermitId,
    protected type: PermitType, 
    protected reason: PermitReason,
    protected user: PermitUser,
    protected createdAt: PermitDate,
    protected status: PermitStatus
  ) {}

  isPending(): boolean {
    return this.status.isPending();
  }

  isApproved(): boolean {
    return this.status.isApproved();
  }

  isRejected(): boolean {
    return this.status.isRejected();
  }

  abstract toPrimitives(): any;
}

export class PermitWithDecision extends Permit {
  constructor(
    id: PermitId,
    type: PermitType, 
    reason: PermitReason,
    user: PermitUser,
    createdAt: PermitDate,
    status: PermitStatus,
    private adminComment: PermitAdminComment,
    private decitionTakenAt: PermitDate,
    private decitionTakenBy: PermitUser
  ) {
    super(
      id,
      type,
      reason,
      user,
      createdAt,
      status
    );
  }
  
  static create(params: {
    id: PermitId,
    type: PermitType,
    reason: PermitReason,
    user: PermitUser,
    createdAt: PermitDate,
    status: PermitStatus,
    adminComment: PermitAdminComment,
    decitionTakenAt: PermitDate,
    decitionTakenBy: PermitUser
  }) {
    return new PermitWithDecision(
      params.id,
      params.type,
      params.reason,
      params.user,
      params.createdAt,
      params.status,
      params.adminComment,
      params.decitionTakenAt,
      params.decitionTakenBy
    );
  }

  static fromPrimitives(params: {
    id: string;
    type: PermitType;
    reason: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
    createdAt: string;
    status: string;
    adminCommment: string;
    decitionTakenAt: string;
    decitionTakenBy: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }) {
    return new PermitWithDecision(
      new UserId(params.id),
      params.type,
      new PermitReason(params.reason),
      PermitUser.fromPrimitives({
        id: params.user.id,
        firstName: params.user.firstName,
        lastName: params.user.lastName
      }),
      new PermitDate(params.createdAt),
      new PermitStatus(params.status),
      new PermitAdminComment(params.adminCommment),
      new PermitDate(params.decitionTakenAt),
      PermitUser.fromPrimitives({
        id: params.decitionTakenBy.id,
        firstName: params.decitionTakenBy.firstName,
        lastName: params.decitionTakenBy.lastName
      })
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      type: this.type,
      reason: this.reason.toString(),
      user: this.user.toPrimitives(),
      createdAt: this.createdAt.toString(),
      status: this.status.toString(),
      adminComment: this.adminComment.toString(),
      decitionTakenAt: this.decitionTakenAt.toString(),
      decitionTakenBy: this.decitionTakenBy.toPrimitives()
    }   
  }
}

export class PermitWithNoDecision extends Permit {
  constructor(
    id: PermitId,
    type: PermitType, 
    reason: PermitReason,
    user: PermitUser,
    createdAt: PermitDate,
    status: PermitStatus
  ) {
    super(
      id,
      type,
      reason,
      user,
      createdAt,
      status
    );
  }
  
  static create(params: {
    id: PermitId,
    type: PermitType,
    reason: PermitReason,
    user: PermitUser,
    createdAt: PermitDate,
  }) {
    return new PermitWithNoDecision(
      params.id,
      params.type,
      params.reason,
      params.user,
      params.createdAt,
      new PermitStatus(PermitStatusList.Pending)
    );
  }

  static fromPrimitives(params: {
    id: string;
    type: PermitType;
    reason: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    }
    createdAt: string;
    status: string;
  }) {
    return new PermitWithNoDecision(
      new UserId(params.id),
      params.type,
      new PermitReason(params.reason),
      PermitUser.fromPrimitives({
        id: params.user.id,
        firstName: params.user.firstName,
        lastName: params.user.lastName
      }),
      new PermitDate(params.createdAt),
      new PermitStatus(params.status)
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      type: this.type,
      reason: this.reason.toString(),
      user: this.user.toPrimitives(),
      createdAt: this.createdAt.toString(),
      status: this.status.toString()
    }   
  }
}
