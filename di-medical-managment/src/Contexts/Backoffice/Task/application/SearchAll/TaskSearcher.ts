import { TaskRepository } from "../../domain/TaskRepository";

export class TaskSearcher {
  constructor(
    private repository: TaskRepository
  ) {}

  async run(params: {
    month: number,
    year: number
  }) {
    const tasks = await this.repository.findAll(
      params.month,
      params.year
    );

    return tasks;
  }
}
