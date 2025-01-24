import { Request, Response } from "express";
import { TaskStatusChanger } from "../../../../../Contexts/Backoffice/Task/application/ChangeStatus/TaskStatusChanger";
import { TaskAlreadyCompleted } from "../../../../../Contexts/Backoffice/Task/domain/TaskAlreadyCompleted";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";

export class TaskChangeStatusAdmin {
  constructor(
    private taskStatusChanger: TaskStatusChanger
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.taskStatusChanger.run({
        id: new TaskId(id)
      });

      res.redirect('/backoffice/task');
    } catch (error) {
      if(error instanceof TaskAlreadyCompleted) {
        res.status(400).render('error/error', {
          message: 'La tarea ya se ha completado, no se puede cambiar su estado'
        });
      } else if(error instanceof TaskNotFound) {
        res.status(404).render('error/error', {
          message: 'No se ha encontrado la tarea'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
