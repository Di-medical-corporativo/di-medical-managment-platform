import { TaskAlreadyCompleted } from "../../domain/TaskAlreadyCompleted";
import { TaskFinder } from "../../domain/TaskFinder";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskScheduler } from "../../domain/TaskScheduler";

export class TaskStatusChanger {
  private taskFinder: TaskFinder;
  
  constructor(
    private repository: TaskRepository,
    private taskScheduler: TaskScheduler
  ) {
    this.taskFinder = new TaskFinder(repository);
  }

  async run(params: {
    id: TaskId
  }) {
    const task = await this.taskFinder.run({
      id: params.id
    });

    if(task.isCompleted()) {
      throw new TaskAlreadyCompleted();
    }

    task.nextStatus();

    await this.repository.updateStatus(task);

    if(task.isCompleted()) {
      await this.taskScheduler.remove(params.id);
    }
  }
}
