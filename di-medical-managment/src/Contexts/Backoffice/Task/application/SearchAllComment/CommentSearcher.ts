import { Comment } from "../../domain/Comment";
import { TaskFinder } from "../../domain/TaskFinder";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";

export class CommentSearcher {
  private taskFinder: TaskFinder;

  constructor(
    private taskRepository: TaskRepository
  ) {
    this.taskFinder = new TaskFinder(taskRepository);
  }

  async run(params: {
    taskId: TaskId
  }) {
    await this.ensureTaskExists(params.taskId);

    const comments: Comment[] = await this.taskRepository.findAllComments(params.taskId);

    return comments;
  }

  private async ensureTaskExists(id: TaskId) {
    await this.taskFinder.run({
      id
    });
  }
}
