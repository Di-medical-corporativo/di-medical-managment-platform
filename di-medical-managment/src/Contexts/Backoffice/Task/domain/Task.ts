import { Department } from "../../Department/domain/Department";
import { UserFirstName } from "../../User/domain/UserFirstName";
import { UserId } from "../../User/domain/UserId";
import { UserLastName } from "../../User/domain/UserLastName";
import { TaskAssiger } from "./TaskAssigner";
import { TaskDescription } from "./TaskDescription";
import { TaskDueTo } from "./TaskDueTo";
import { TaskId } from "./TaskId";
import { TaskIsPoint } from "./TaskIsPoint";
import { StatusList, TaskStatus } from "./TaskStatus";
import { TaskTitle } from "./TaskTitle";
import { TaskUser } from "./TaskUser";

export class Task {
  private commentCount: number = 0;
  constructor(
    private id: TaskId,
    private title: TaskTitle,
    private description: TaskDescription,
    private userAssigned: TaskUser,
    private status: TaskStatus,
    private dueTo: TaskDueTo,
    private isPoint: TaskIsPoint,
    private department: Department,
    private assigner?: TaskAssiger
  ) {}

  public setCommentCount(count: number) {
    this.commentCount = count;
  }

  public updateDepartment(department: Department) {
    this.department = department;
  }

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
    isPoint: TaskIsPoint,
    department: Department,
    assigner?: TaskAssiger
  }) {
    return new Task(
      params.id,
      params.title,
      params.description,
      params.userAssigned,
      new TaskStatus(StatusList.Assigned),
      params.dueTo,
      params.isPoint,
      params.department,
      params.assigner
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
    department: { id: string; name: string; }
    assigner?: { id: string; firstName: string; lastName: string; }
  }) {
    let assigner: undefined | TaskAssiger = undefined;
    if(params.assigner) {
      assigner =  new TaskAssiger(
        new UserId(params.assigner.id),
        new UserFirstName(params.assigner.firstName),
        new UserLastName(params.assigner.lastName)
      )
    }

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
      new TaskIsPoint(params.isPoint),
      Department.fromPrimitives({ id: params.department.id, name: params.department.name }),
      assigner
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
      isPoint: this.isPoint.value,
      department: this.department.toPrimitives(),
      assigner: this.assigner?.toPrimitives(),
      commentCount: this.commentCount
    }
  }
}
