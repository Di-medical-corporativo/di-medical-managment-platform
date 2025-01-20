import { TaskRepository } from "../../domain/TaskRepository";

export class TaskOverviewer {
  constructor(
    private repository: TaskRepository
  ) {}

  async run() {
    const overview = await this.repository.overview();

    return overview;
  }
}
