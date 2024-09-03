import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";
import { StatusList } from "../../Task/domain/TaskStatus";

export class PointStatus extends StringValueObject {
  public isDone() {
    if(this.value === StatusList.Completed || this.value == StatusList.PastDue) {
      return true;
    }

    return false;
  }
}
