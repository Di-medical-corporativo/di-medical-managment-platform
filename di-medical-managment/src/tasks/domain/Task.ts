import { User } from "../../shared/domain/User"
import { TaskDescription } from "./TaskDescription"
import { TaskDueToDate } from "./TaskDueToDate"
import { TaskId } from "./TaskId"
import { TaskStartDate } from "./TaskStartDate"
import { TaskStatus } from "./TaskStatus"
import { TaskTitle } from "./TaskTitle"

export class Task {
  constructor(
    private readonly taskId: TaskId,
    private readonly title: TaskTitle,
    private readonly description: TaskDescription,
    private readonly userAssigned: User,
    private readonly status: TaskStatus,
    private readonly startedDate: TaskStartDate,
    private readonly dueToDate: TaskDueToDate,
  ) {}
  
  public toPrimitives() {
    return {
      id: this.taskId.value,
      name: this.title.value,
      description: this.description.value,
      userAssigned: this.userAssigned.toPrimitives(),
      status: this.status.toPrimitives()
    }
  }
}
