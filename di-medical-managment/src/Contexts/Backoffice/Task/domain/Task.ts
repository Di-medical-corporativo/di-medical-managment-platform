import { TaskDescription } from "./TaskDescription";
import { TaskDueTo } from "./TaskDueTo";
import { TaskId } from "./TaskId";
import { TaskIsPoint } from "./TaskIsPoint";
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
    private dueTo: TaskDueTo,
    private isPoint: TaskIsPoint
  ) {}

  public updateTitle(title: TaskTitle) {
    this.title = title;
  }

  public updateDescription(description: TaskDescription) {
    this.description = description;
  }

  public isCompleted() {
    return this.status.isCompleted();
  }

  public isAssigned() {
    return this.status.isAssigned();
  }

  public isInProgress() {
    return this.status.isInProgress();
  }

  public isOverDue() {
    return this.status.isPastDue();
  }

  public shouldBeReschedule(dueTo: TaskDueTo) {
    const now = new Date();

    if(dueTo.isAfter(now)) {
      return true;
    }

    return false;
  }

  public belogsToItinerary() {
    return this.isPoint.value;
  }

  public nextStatus() {
    if(this.status.isAssigned()) {
      this.status = new TaskStatus(StatusList.Progress); 
      return;
    }

    if(this.status.isInProgress()) {
      this.status = new TaskStatus(StatusList.Completed);
      return;
    }
  }

  public updateDueTo(dueTo: TaskDueTo) {
    
    if(dueTo.toString() === this.dueTo.toString()) {
      return;
    }

    this.dueTo = dueTo;
  
    const now = new Date();

    if((this.status.isPastDue() || this.status.isCompleted()) && dueTo.isAfter(now)) {
      this.status = new TaskStatus(StatusList.Progress);
    }
  }

  static create(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssigned: TaskUser
    dueTo: TaskDueTo,
    isPoint: TaskIsPoint
  }) {
    return new Task(
      params.id,
      params.title,
      params.description,
      params.userAssigned,
      new TaskStatus(StatusList.Assigned),
      params.dueTo,
      params.isPoint
    );
  }

  static fromPrimitives(params: {
    id: string;
    title: string;
    description: string;
    userAssigned: { id: string; firstName: string; lastName: string };
    status: string;
    dueTo: string;
    isPoint: boolean;
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
      new TaskDueTo(params.dueTo),
      new TaskIsPoint(params.isPoint)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.title.toString(),
      description: this.description.toString(),
      userAssigned: this.userAssigned.toPrimitives(),
      status: this.status.toString(),
      dueTo: this.dueTo.toString(),
      isPoint: this.isPoint.value
    }
  }
}
