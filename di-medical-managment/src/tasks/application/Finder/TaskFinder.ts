import { TaskRepository } from "../../domain/TaskRepository";

export class TaskFinder {
  constructor(
    private taskRepository: TaskRepository
  ) {}

  run() {
    return "Hola mundo"
  }

}
