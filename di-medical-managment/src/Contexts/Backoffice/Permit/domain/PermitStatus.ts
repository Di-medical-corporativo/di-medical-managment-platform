import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";

export enum PermitStatusList {
  Pending = 'pending-permit',
  Approved = 'approved-permit',
  Rejected = 'rejected-permit'
}

export class PermitStatus extends StringValueObject {
  isPending(): boolean {
    return this.value === PermitStatusList.Pending;
  }

  isApproved(): boolean {
    return this.value === PermitStatusList.Approved;
  }

  isRejected(): boolean {
    return this.value === PermitStatusList.Rejected;
  }
}
