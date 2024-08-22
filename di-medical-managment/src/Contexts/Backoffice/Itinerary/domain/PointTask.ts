import { TaskId } from "../../Task/domain/TaskId";
import { TaskStatus } from "../../Task/domain/TaskStatus";

export class PointTask {
  constructor(
    private id: TaskId,
    private status: TaskStatus
  ) {}

  static fromPrimitives(params: {
    id: string;
    status: string
  }) {
    return new PointTask(
      new TaskId(params.id),
      new TaskStatus(params.status)
    );
  }

  static create(params: {
    id: TaskId,
    status: TaskStatus
  }) {
    return new PointTask(
      params.id,
      params.status
    );
  }
  
  toPrimitives() {
    return {
      id: this.id.toString(),
      status: this.status.toString()
    }
  }
}
