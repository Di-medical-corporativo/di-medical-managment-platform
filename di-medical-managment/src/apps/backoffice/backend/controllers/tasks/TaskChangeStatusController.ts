import { TaskStatusChanger } from "../../../../../Contexts/Backoffice/Task/application/ChangeStatus/TaskStatusChanger";
import { Request, Response } from "express";
import { TaskAlreadyCompleted } from "../../../../../Contexts/Backoffice/Task/domain/TaskAlreadyCompleted";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";

export class TaskChangeStatusController {
  constructor(
    private taskStatusChanger: TaskStatusChanger
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.taskStatusChanger.run({
        id: new TaskId(id)
      });

      res.sendStatus(200);
    } catch (error) {
      if(error instanceof TaskAlreadyCompleted) {
        res.status(400).render('error/error', {
          message: 'La tarea ya se ha completado, no se puede cambiar su estado'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
