import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";

export class TaskDueTo extends StringValueObject {
  public isAfter(date: Date): boolean {
    const taskTime = new Date(this.value);

    if(taskTime.getTime() > date.getTime()) {
      return true;
    }

    return false;
  }
}
