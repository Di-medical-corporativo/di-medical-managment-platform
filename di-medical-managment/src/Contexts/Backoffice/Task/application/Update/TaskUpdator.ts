import { TaskDescription } from "../../domain/TaskDescription";
import { TaskDueTo } from "../../domain/TaskDueTo";
import { TaskFinder } from "../../domain/TaskFinder";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskTitle } from "../../domain/TaskTitle";

export class TaskUpdator {
  private taskFinder: TaskFinder;

  constructor(
    private repository: TaskRepository
  ) {
    this.taskFinder = new TaskFinder(repository);
  }

  async run(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    dueTo: TaskDueTo 
  }) {
    const task = await this.taskFinder.run({
      id: params.id
    });

    task.updateDescription(params.description);

    task.updateTitle(params.title);

    task.updateDueTo(params.dueTo);

    await this.repository.update(task);
  }
}
