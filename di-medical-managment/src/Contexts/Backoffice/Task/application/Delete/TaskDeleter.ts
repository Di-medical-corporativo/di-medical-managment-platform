import { TaskFinder } from "../../domain/TaskFinder";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";

export class TaskDeleter {
  private taskFinder: TaskFinder
  
  constructor(
    private repository: TaskRepository
  ) {
    this.taskFinder = new TaskFinder(repository);
  }

  async run(params: {
    id: TaskId
  }) {
    await this.ensureTaskExists(params.id);

    await this.repository.delete(params.id);
  }

  private async ensureTaskExists(taskId: TaskId) {
    await this.taskFinder.run({
      id: taskId
    });
  }
}
