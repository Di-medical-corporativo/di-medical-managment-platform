import { TaskDescription } from "./TaskDescription";
import { TaskDueToDate } from "./TaskDueToDate";
import { TaskId } from "./TaskId";
import { TaskStartDate } from "./TaskStartDate";
import { TaskStatus } from "./TaskStatus";
import { TaskTitle } from "./TaskTitle";
import { TaskUserAssignedId } from "./TaskUserAssigned";
import { TaskUserAssignedName } from "./TaskUserAssignedName";
import { TaskUserAssignedPicture } from "./TaskUserAssignedPicture";

export class Task {
  constructor(
    private readonly taskId: TaskId,
    private readonly title: TaskTitle,
    private readonly description: TaskDescription,
    private readonly userAssigned: TaskUserAssignedId,
    private readonly userAssignedName: TaskUserAssignedName,
    private readonly userAssignedPicture: TaskUserAssignedPicture,
    private readonly status: TaskStatus,
    private readonly startedDate: TaskStartDate,
    private readonly dueToDate: TaskDueToDate
  ) {}

  public static create(
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssigned: TaskUserAssignedId,
    userAssignedName: TaskUserAssignedName,
    userAssignedPicture: TaskUserAssignedPicture,
    status: TaskStatus,
    startedDate: TaskStartDate,
    dueToDate: TaskDueToDate
  ) {
    return new Task(
      id,
      title,
      description,
      userAssigned,
      userAssignedName,
      userAssignedPicture,
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
      userAssignedName: this.userAssignedName.toString(),
      userAssignedPicture: this.userAssignedPicture.toString(),
      status: this.status.toPrimitives(),
      startDate: this.startedDate.toString(),
      dueToDate: this.dueToDate.toString()
    }
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
      new TaskUserAssignedId(userAssignedId),
      new TaskUserAssignedName(userAssignedName),
      new TaskUserAssignedPicture(userAssignedPicture),
      TaskStatus.fromPrimitive(status),
      new TaskStartDate(startedDate as unknown as Date),
      new TaskDueToDate(dueToDate as unknown as Date)
    )
  }
}
