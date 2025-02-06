import { Request, Response } from "express";
import { TaskCommenter } from "../../../../../Contexts/Backoffice/Task/application/Comment/TaskCommenter";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { CommentId } from "../../../../../Contexts/Backoffice/Task/domain/CommentId";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { CommentText } from "../../../../../Contexts/Backoffice/Task/domain/CommentText";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  modules: { id: string; name: string }[];
}


export class TaskCommentController {
  constructor(
    private taskCommenter: TaskCommenter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const user = req.user as (User | undefined);

      if (!user) {
        res.status(400).redirect('/login');

        return;
      }

      const { text, taskId, commentId } = req.body;

      await this.taskCommenter.run({
        id: new CommentId(commentId),
        taskId: new TaskId(taskId),
        text: new CommentText(text),
        userId: new UserId(user.id)
      });

      res.redirect(`/backoffice/task/${taskId}/comments`);
    } catch (error) {
      if(error instanceof TaskNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la tarea, intenta de nuevo'
        });
      } else if(error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
