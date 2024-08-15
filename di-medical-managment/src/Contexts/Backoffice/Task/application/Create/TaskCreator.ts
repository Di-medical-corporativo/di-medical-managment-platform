import { Task } from "../../domain/Task";
import { TaskDescription } from "../../domain/TaskDescription";
import { TaskDueTo } from "../../domain/TaskDueTo";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskTitle } from "../../domain/TaskTitle";
import { TaskUser } from "../../domain/TaskUser";

export class TaskCreator {
  constructor(
    private repository: TaskRepository
  ) {}

  async run(params: {
    id: TaskId,
    title: TaskTitle,
    description: TaskDescription,
    userAssigned: TaskUser,
    dueTo: TaskDueTo
  }) {
    const task = Task.create(params);

    await this.repository.save(task);
  }
}
