import { TaskDescription } from "./TaskDescription";
import { TaskDueToDate } from "./TaskDueToDate";
import { TaskId } from "./TaskId";
import { TaskStartDate } from "./TaskStartDate";
import { TaskStatus } from "./TaskStatus";
import { TaskTitle } from "./TaskTitle";
import { TaskUserAssignedId } from "./TaskUserAssigned";

export class Task {
  constructor(
    private readonly taskId: TaskId,
    private readonly title: TaskTitle,
    private readonly description: TaskDescription,
    private readonly userAssigned: TaskUserAssignedId,
    private readonly status: TaskStatus,
    private readonly startedDate: TaskStartDate,
    private readonly dueToDate: TaskDueToDate
  ) {}

  public static create(
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssigned: TaskUserAssignedId,
    status: TaskStatus,
    startedDate: TaskStartDate,
    dueToDate: TaskDueToDate
  ) {
    return new Task(
      id,
      title,
      description,
      userAssigned,
      status,
      startedDate,
      dueToDate
    )
  }

  public toPrimitives() {
    return {
      id: this.taskId.value,
      title: this.title.value,
      description: this.description.value,
      userAssignedId: this.userAssigned.toString(),
      status: this.status.toPrimitives(),
      startDate: this.startedDate.toString(),
      dueToDate: this.dueToDate.toString()
    }
  }
}
