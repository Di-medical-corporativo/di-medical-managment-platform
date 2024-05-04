import { User } from "../../shared/domain/User"
import { TaskDescription } from "./TaskDescription"
import { TaskDueToDate } from "./TaskDueToDate"
import { TaskEndDate } from "./TaskEndDate"
import { TaskId } from "./TaskId"
import { TaskStartDate } from "./TaskStartDate"
import { Backlog, TaskStatus } from "./TaskStatus"
import { TaskTitle } from "./TaskTitle"
import { UserAssignedId } from "./UserAssignedId"
import { UserAssignedName } from "./UserAssignedName"
import { UserAssignedPicture } from "./UserAssignedPicture"

export class Task {
  constructor(
    private taskId: TaskId,
    private title: TaskTitle,
    private description: TaskDescription,
    private userAssignedId: UserAssignedId,
    private userAssignedName: UserAssignedName,
    private userAssignedPicture: UserAssignedPicture,
    private status: TaskStatus,
    private startedDate: TaskStartDate,
    private dueToDate: TaskDueToDate,
    private endDate: TaskEndDate
  ) {}

  getTaskId(): TaskId {
    return this.taskId;
  }

  getTitle(): TaskTitle {
    return this.title;
  }

  getDescription(): TaskDescription {
    return this.description;
  }

  getUserAssignedId(): UserAssignedId {
    return this.userAssignedId;
  }

  getUserAssignedName(): UserAssignedName {
    return this.userAssignedName;
  }

  getUserAssignedPicture(): UserAssignedPicture {
    return this.userAssignedPicture;
  }

  getStatus(): TaskStatus {
    return this.status;
  }

  getStartedDate(): TaskStartDate {
    return this.startedDate;
  }

  getDueToDate(): TaskDueToDate {
    return this.dueToDate;
  }

  getEndDate(): TaskEndDate {
    return this.endDate
  }
  
  public static create(
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssignedId: UserAssignedId,
    userAssignedName: UserAssignedName,
    userAssignedPiture: UserAssignedPicture,
    status: TaskStatus,
    startedDate: TaskStartDate,
    dueToDate: TaskDueToDate,
    endDate: TaskEndDate
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
      dueToDate,
      endDate
    )
  }

  public updateDueToDate(newDueToDate: TaskDueToDate) {
    this.dueToDate = newDueToDate
  }

  public updateTitle(newTitle: TaskTitle) {
    this.title = newTitle
  }

  public updateStatus(newStatus: TaskStatus) {
    this.status = newStatus

    if(newStatus.isDone()) {
      this.endDate = new TaskEndDate(new Date())
    }

    if(newStatus.isDoing()) {
      this.startedDate = new TaskStartDate(new Date())
    }
  }

  public updateDescription(newDescription: TaskDescription) {
    this.description = newDescription
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
    dueToDate: string,
    endDate: string
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
      new TaskDueToDate(new Date(dueToDate)),
      new TaskEndDate(new Date(endDate))
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
      dueDate: this.dueToDate.toString(),
      endDate: this.endDate.toString()
    }
  }
}
