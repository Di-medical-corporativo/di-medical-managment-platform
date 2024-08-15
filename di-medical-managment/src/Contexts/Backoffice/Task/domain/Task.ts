import { TaskDescription } from "./TaskDescription";
import { TaskDueTo } from "./TaskDueTo";
import { TaskId } from "./TaskId";
import { StatusList, TaskStatus } from "./TaskStatus";
import { TaskTitle } from "./TaskTitle";
import { TaskUser } from "./TaskUser";

export class Task {
  constructor(
    private id: TaskId,
    private title: TaskTitle,
    private description: TaskDescription,
    private userAssigned: TaskUser,
    private status: TaskStatus,
    private dueTo: TaskDueTo
  ) {}

  static create(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssigned: TaskUser
    dueTo: TaskDueTo
  }) {
    return new Task(
      params.id,
      params.title,
      params.description,
      params.userAssigned,
      new TaskStatus(StatusList.Assigned),
      params.dueTo
    );
  }

  static fromPrimitives(params: {
    id: string;
    title: string;
    description: string;
    userAssigned: { id: string; firstName: string; lastName: string };
    status: string;
    dueTo: string;
  }) {
    return new Task(
      new TaskId(params.id),
      new TaskTitle(params.title),
      new TaskDescription(params.description),
      TaskUser.fromPrimitives({ 
        id: params.userAssigned.id, 
        firstName: params.userAssigned.firstName, 
        lastName: params.userAssigned.lastName 
      }),
      new TaskStatus(params.status),
      new TaskDueTo(params.dueTo)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.title.toString(),
      description: this.description.toString(),
      userAssigned: this.userAssigned.toPrimitives(),
      status: this.status.toString(),
      dueTo: this.dueTo.toString()
    }
  }
}
