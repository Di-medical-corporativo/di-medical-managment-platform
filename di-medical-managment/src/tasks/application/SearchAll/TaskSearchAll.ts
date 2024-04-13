import { TaskRepository } from "../../domain/TaskRepository";

export class TaskSearchAll {
  
  constructor(
    private taskRepository: TaskRepository
  ) {}

  public async run() {
    const tasks = await this.taskRepository.searchAll()
    const taskPrimitives = tasks.map(task => task.toPrimitives())
    return taskPrimitives
  }
}
