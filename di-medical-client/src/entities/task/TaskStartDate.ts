import { DateValueObject } from "../vo/DateValueObject";

export class TaskStartDate extends DateValueObject {
  toString(): string {
    return this.value.toISOString()
  }
}
