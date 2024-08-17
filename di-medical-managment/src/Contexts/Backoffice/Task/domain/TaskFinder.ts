import { TaskId } from "./TaskId";
import { TaskNotFound } from "./TaskNotFound";
import { TaskRepository } from "./TaskRepository";

export class TaskFinder {
  constructor(
    private repository: TaskRepository
  ) {}

  async run(params: {
    id: TaskId
  }) {
    const task = await this.repository.search(params.id);

    if(task == null) {
      throw new TaskNotFound();
    }

    return task;
  }
}
