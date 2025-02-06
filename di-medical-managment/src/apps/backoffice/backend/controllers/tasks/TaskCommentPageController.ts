import { Request, Response } from "express";
import { CommentSearcher } from "../../../../../Contexts/Backoffice/Task/application/SearchAllComment/CommentSearcher";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";
import { Comment } from "../../../../../Contexts/Backoffice/Task/domain/Comment";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { v4 as uuid } from "uuid";

export class TaskCommentPageController {
  constructor(
    private commentSearcher: CommentSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const commentId = uuid();

      const comments: Comment[] = await this.commentSearcher.run({
        taskId: new TaskId(id)
      });

      res.status(200).render('comments/task-comment', {
        comments: comments.map(c => c.toPrimitives()),
        taskId: id,
        commentId
      });
    } catch (error) {
      if(error instanceof TaskNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la tarea, intenta de nuevo'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
