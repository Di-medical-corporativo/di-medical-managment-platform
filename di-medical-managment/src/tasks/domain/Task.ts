import { User } from "../../shared/domain/User"
import { TaskDescription } from "./TaskDescription"
import { TaskDueToDate } from "./TaskDueToDate"
import { TaskId } from "./TaskId"
import { TaskStartDate } from "./TaskStartDate"
import { Backlog, TaskStatus } from "./TaskStatus"
import { TaskTitle } from "./TaskTitle"
import { UserAssignedId } from "./UserAssignedId"
import { UserAssignedName } from "./UserAssignedName"
import { UserAssignedPicture } from "./UserAssignedPicture"

export class Task {
  constructor(
    private readonly taskId: TaskId,
    private readonly title: TaskTitle,
    private readonly description: TaskDescription,
    private readonly userAssignedId: UserAssignedId,
    private readonly userAssignedName: UserAssignedName,
    private readonly userAssignedPicture: UserAssignedPicture,
    private readonly status: TaskStatus,
    private readonly startedDate: TaskStartDate,
    private readonly dueToDate: TaskDueToDate,
  ) {}
  
  public static create(
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssignedId: UserAssignedId,
    userAssignedName: UserAssignedName,
    userAssignedPiture: UserAssignedPicture,
    status: TaskStatus,
    startedDate: TaskStartDate,
    dueToDate: TaskDueToDate
  ) {
    return new Task(
      id,
      title,
      description,
      userAssignedId,
      userAssignedName,
      userAssignedPiture,
      status,
      startedDate,
      dueToDate
    )
  }

  public static fromPrimitives(
    id: string,
    title: string,
    description: string,
    userAssignedId: string,
    userAssignedName: string,
    userAssignedPicture: string,
    status: string,
    startedDate: string,
    dueToDate: string
  ) {
    return new Task(
      new TaskId(id),
      new TaskTitle(title),
      new TaskDescription(description),
      new UserAssignedId(userAssignedId),
      new UserAssignedName(userAssignedName),
      new UserAssignedPicture(userAssignedPicture),
      TaskStatus.fromPrimitive(status),
      new TaskStartDate(new Date(startedDate)),
      new TaskDueToDate(new Date(dueToDate))
    )
  }

  public toPrimitives() {
    return {
      id: this.taskId.value,
      name: this.title.value,
      description: this.description.value,
      userAssignedId: this.userAssignedId.toString(),
      userAssignedName: this.userAssignedName.toString(),
      userAssignedPicture: this.userAssignedPicture.toString(),
      status: this.status.toPrimitives(),
      startedDate: this.startedDate.toString(),
      dueDate: this.dueToDate.toString()
    }
  }
}
