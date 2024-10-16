import { UserId } from "../../../User/domain/UserId";
import { Task } from "../../domain/Task";
import { TaskRepository } from "../../domain/TaskRepository";

export class UserKanbanGenerator {
  constructor(
    private taskRepository: TaskRepository
  ) {}

  async run(params: {
    id: UserId
  }) {
    const tasks: Task[] = await this.taskRepository.kanban(params.id);

    const assignedTasks = tasks.filter(task => task.isAssigned())

    const inProgressTasks = tasks.filter(task => task.isInProgress());

    const completedTasks = tasks.filter(task => task.isCompleted());
    
    const overdueTasks = tasks.filter(task => task.isOverDue()); 

    return {
      assignedTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks
    }
  }
}
