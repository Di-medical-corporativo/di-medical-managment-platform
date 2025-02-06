import { User } from "../../../User/domain/User";
import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { Comment } from "../../domain/Comment";
import { CommentId } from "../../domain/CommentId";
import { CommentText } from "../../domain/CommentText";
import { CommentUser } from "../../domain/CommentUser";
import { TaskFinder } from "../../domain/TaskFinder";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";

export class TaskCommenter {
  private userFinder: UserFinder;
  
  private taskFinder: TaskFinder;

  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);

    this.taskFinder = new TaskFinder(taskRepository);
  }

  async run(params: {
    id: CommentId,
    text: CommentText,
    userId: UserId,
    taskId: TaskId
  }) {
    await this.ensureTaskExists(params.taskId);

    const user: User = await this.userFinder.run(params.userId.toString());

    const fullNamePrimitive: string = user.fullNameString();

    const comment: Comment = Comment.create({
      id: params.id,
      taskId: params.taskId,
      text: params.text,
      userId: params.userId,
      userName: new CommentUser(fullNamePrimitive),
      createdAt: new Date()
    });

    await this.taskRepository.comment(comment);
  }

  private async ensureTaskExists(id: TaskId) {
    await this.taskFinder.run({
      id
    });
  }
}
