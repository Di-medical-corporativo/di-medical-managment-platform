import { UserId } from "../../User/domain/UserId";
import { CommentId } from "./CommentId";
import { CommentText } from "./CommentText";
import { CommentUser } from "./CommentUser";
import { TaskId } from "./TaskId";

export class Comment {
  constructor(
    private id: CommentId,
    private text: CommentText,
    private userName: CommentUser,
    private userId: UserId,
    private taskId: TaskId,
    private createdAt: Date
  ) {}

  static create(params: {
    id: CommentId,
    text: CommentText,
    userName: CommentUser,
    userId: UserId,
    taskId: TaskId,
    createdAt: Date
  }) {
    return new Comment(
      params.id,
      params.text,
      params.userName,
      params.userId,
      params.taskId,
      params.createdAt
    );
  }

  static fromPrimitives(params: {
    id: string,
    text: string,
    userName: string,
    userId: string,
    taskId: string,
    createdAt: Date
  }) {
    return new Comment(
      new CommentId(params.id),
      new CommentText(params.text),
      new CommentUser(params.userName),
      new UserId(params.userId),
      new TaskId(params.taskId),
      params.createdAt
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      text: this.text.toString(),
      userName: this.userName.toString(),
      userId: this.userId.toString(),
      taskId: this.taskId.toString(),
      createdAt: this.createdAt.toISOString()
    }
  }
}
