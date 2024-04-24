import { DateValueObject } from "../vo/DateValueObject";

export class TaskDueToDate extends DateValueObject {
  toString(): string {
    return this.value.toISOString()
  }
}
