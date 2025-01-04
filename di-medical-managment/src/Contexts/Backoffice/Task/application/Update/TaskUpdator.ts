import { DeparmentId } from "../../../Department/domain/DeparmentId";
import { Department } from "../../../Department/domain/Department";
import { DepartmentFinder } from "../../../Department/domain/DepartmentFinder";
import { DepartmentRepository } from "../../../Department/domain/DepartmentRepository";
import { Task } from "../../domain/Task";
import { TaskDescription } from "../../domain/TaskDescription";
import { TaskDueTo } from "../../domain/TaskDueTo";
import { TaskFinder } from "../../domain/TaskFinder";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskScheduler } from "../../domain/TaskScheduler";
import { TaskTitle } from "../../domain/TaskTitle";

export class TaskUpdator {
  private taskFinder: TaskFinder;

  private departmentFinder: DepartmentFinder;

  constructor(
    private repository: TaskRepository,
    private taskScheduler: TaskScheduler,
    private departmentRepository: DepartmentRepository
  ) {
    this.taskFinder = new TaskFinder(repository);

    this.departmentFinder = new DepartmentFinder(departmentRepository);
  }

  async run(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    dueTo: TaskDueTo,
    departmentId: DeparmentId
  }) {
    const department: Department = await this.departmentFinder.run({
      id: params.departmentId
    });

    const task: Task = await this.taskFinder.run({
      id: params.id
    });

    task.updateDescription(params.description);

    task.updateTitle(params.title);

    task.updateDueTo(params.dueTo);

    task.updateDepartment(department);

    if(task.shouldBeReschedule(params.dueTo)) {
      await this.taskScheduler.reschedule(
        params.id,
        new Date(params.dueTo.toString())
      );
    }

    await this.repository.update(task);
  }
}
