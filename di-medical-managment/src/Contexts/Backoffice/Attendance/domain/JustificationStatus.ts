import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";

export enum JustificationStatusEnum {
  pending = 'pending-justification',
  approved = 'approved-justification',
  rejected = 'rejected-justification'
}

export class JustificationStatus extends StringValueObject {}
