import { User } from "../../shared/domain/User"
import { TaskDescription } from "./TaskDescription"
import { TaskDueToDate } from "./TaskDueToDate"
import { TaskId } from "./TaskId"
import { TaskStartDate } from "./TaskStartDate"
import { TaskStatus } from "./TaskStatus"
import { TaskTitle } from "./TaskTitle"
import { UserAssignedId } from "./UserAssignedId"

export class Task {
  constructor(
    private readonly taskId: TaskId,
    private readonly title: TaskTitle,
    private readonly description: TaskDescription,
    private readonly userAssigned: UserAssignedId,
    private readonly status: TaskStatus,
    private readonly startedDate: TaskStartDate,
    private readonly dueToDate: TaskDueToDate,
  ) {}
  
  public static create(
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssigned: UserAssignedId,
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
      name: this.title.value,
      description: this.description.value,
      userAssigned: this.userAssigned.toString(),
      status: this.status.toPrimitives(),
      startedDate: this.startedDate.toString(),
      dueDate: this.dueToDate.toString()
    }
  }
}
