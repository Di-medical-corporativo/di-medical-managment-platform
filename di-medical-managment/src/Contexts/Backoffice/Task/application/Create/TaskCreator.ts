import { DeparmentId } from "../../../Department/domain/DeparmentId";
import { DepartmentFinder } from "../../../Department/domain/DepartmentFinder";
import { DepartmentRepository } from "../../../Department/domain/DepartmentRepository";
import { UserFinder } from "../../../User/domain/UserFinder";
import { UserFirstName } from "../../../User/domain/UserFirstName";
import { UserId } from "../../../User/domain/UserId";
import { UserLastName } from "../../../User/domain/UserLastName";
import { UserRepository } from "../../../User/domain/UserRepository";
import { Task } from "../../domain/Task";
import { TaskDescription } from "../../domain/TaskDescription";
import { TaskDueTo } from "../../domain/TaskDueTo";
import { TaskId } from "../../domain/TaskId";
import { TaskIsPoint } from "../../domain/TaskIsPoint";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskScheduler } from "../../domain/TaskScheduler";
import { TaskTitle } from "../../domain/TaskTitle";
import { TaskUser } from "../../domain/TaskUser";

export class TaskCreator {
  private userFinder: UserFinder;
  private departmentFinder: DepartmentFinder;
  
  constructor(
    private repository: TaskRepository,
    private userRepository: UserRepository,
    private taskScheduler: TaskScheduler,
    private departmentRepository: DepartmentRepository
  ) {
    this.userFinder = new UserFinder(userRepository);

    this.departmentFinder = new DepartmentFinder(departmentRepository);
  }

  async run(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userId: UserId,
    dueTo: TaskDueTo,
    departmentId: DeparmentId
  }) {
    const user = await this.userFinder.run(params.userId.toString());
    
    const { firstName, lastName, id } = user.toPrimitives();

    const department = await this.departmentFinder.run({
      id: params.departmentId
    });

    const taskUser = TaskUser.create({
      firstName: new UserFirstName(firstName),
      lastName: new UserLastName(lastName),
      id: new UserId(id)
    });

    const task = Task.create({
      description: params.description,
      dueTo: params.dueTo,
      id: params.id,
      title: params.title,
      userAssigned: taskUser,
      isPoint: new TaskIsPoint(false),
      department
    });

    await this.repository.save(task);

    await this.taskScheduler.schedule(
      params.id,
      new Date(params.dueTo.toString())
    );
  }

  async runForPoint(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userId: UserId,
    dueTo: TaskDueTo,
    isPoint: TaskIsPoint,
    departmentId: DeparmentId
  }) {
    const user = await this.userFinder.run(params.userId.toString());
    
    const { firstName, lastName, id } = user.toPrimitives();

    const department = await this.departmentFinder.run({
      id: params.departmentId
    });

    const taskUser = TaskUser.create({
      firstName: new UserFirstName(firstName),
      lastName: new UserLastName(lastName),
      id: new UserId(id)
    });

    const task = Task.create({
      description: params.description,
      dueTo: params.dueTo,
      id: params.id,
      title: params.title,
      userAssigned: taskUser,
      isPoint: params.isPoint,
      department
    });

    await this.repository.save(task);

    await this.taskScheduler.schedule(
      params.id,
      new Date(params.dueTo.toString())
    );
  }
}
