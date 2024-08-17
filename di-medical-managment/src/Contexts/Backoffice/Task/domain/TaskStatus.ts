import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";

export enum StatusList {
  Assigned = 'assigned',
  Progress = 'in-progress',
  Completed = 'completed',
  PastDue = 'pastdue'
}

export class TaskStatus extends StringValueObject {
  public isPastDue() {
    if(this.value === StatusList.PastDue) {
      return true;
    }

    return false;
  }
}
