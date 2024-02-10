import { TaskStatusName } from "./TaskStatusName";

export class TaskStatus {
  constructor(
    private name: TaskStatusName
  ) {}

  toPrimitives() {
    return {
      name: this.name
    }
  }
}
