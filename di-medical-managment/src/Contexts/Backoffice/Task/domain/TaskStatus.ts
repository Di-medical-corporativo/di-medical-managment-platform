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

  public isAssigned() {
    if(this.value === StatusList.Assigned) {
      return true;
    }

    return false;
  }

  public isInProgress() {
    if(this.value === StatusList.Progress) {
      return true;
    }

    return false;
  }

  public isCompleted() {
    if(this.value === StatusList.Completed) {
      return true;
    }

    return false;
  }
}
