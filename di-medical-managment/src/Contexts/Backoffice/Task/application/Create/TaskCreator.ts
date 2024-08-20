import { UserFinder } from "../../../User/domain/UserFinder";
import { UserFirstName } from "../../../User/domain/UserFirstName";
import { UserId } from "../../../User/domain/UserId";
import { UserLastName } from "../../../User/domain/UserLastName";
import { UserRepository } from "../../../User/domain/UserRepository";
import { Task } from "../../domain/Task";
import { TaskDescription } from "../../domain/TaskDescription";
import { TaskDueTo } from "../../domain/TaskDueTo";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskScheduler } from "../../domain/TaskScheduler";
import { TaskTitle } from "../../domain/TaskTitle";
import { TaskUser } from "../../domain/TaskUser";

export class TaskCreator {
  private userFinder: UserFinder;
  
  constructor(
    private repository: TaskRepository,
    private userRepository: UserRepository,
    private taskScheduler: TaskScheduler
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userId: UserId,
    dueTo: TaskDueTo
  }) {
    const user = await this.userFinder.run(params.userId.toString());
    
    const { firstName, lastName, id } = user.toPrimitives();

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
      userAssigned: taskUser
    });

    await this.repository.save(task);

    await this.taskScheduler.schedule(
      params.id,
      new Date(params.dueTo.toString())
    );
  }
}
