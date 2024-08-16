import { TaskRepository } from "../../domain/TaskRepository";

export class TaskSearcher {
  constructor(
    private repository: TaskRepository
  ) {}

  async run() {
    const tasks = await this.repository.findAll();

    return tasks;
  }
}
