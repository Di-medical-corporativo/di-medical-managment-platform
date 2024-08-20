import { TaskFinder } from "../../domain/TaskFinder";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";

export class TaskTimeOutProcessor {
  private taskFinder: TaskFinder;

  constructor(
    private repository: TaskRepository
  ) {
    this.taskFinder = new TaskFinder(repository);
  }

  async run(params: {
    id: TaskId
  }) {
    const task = await this.taskFinder.run({
      id: params.id
    });

    if(!task.isCompleted()) {
      await this.repository.timeOut(params.id);
    }
  }
}
