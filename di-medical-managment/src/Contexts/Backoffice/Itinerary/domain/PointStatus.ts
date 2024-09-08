import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";
import { StatusList } from "../../Task/domain/TaskStatus";

export enum PointStatusList {
  PointWithProblem = 'point-has-problem'
}

export class PointStatus extends StringValueObject {
  public isDone() {
    if(this.value === StatusList.Completed || this.value == StatusList.PastDue || this.value == PointStatusList.PointWithProblem) {
      return true;
    }

    return false;
  }
}
