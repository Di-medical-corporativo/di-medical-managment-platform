import { TaskDeleter } from "../../../../../Contexts/Backoffice/Task/application/Delete/TaskDeleter";
import { Request, Response } from "express";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";

export class TaskDeleteController {
  constructor(
    private taskDeleter: TaskDeleter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.taskDeleter.run({
        id: new TaskId(id)
      });

      res.redirect('/backoffice/task');
    } catch (error) {
      if(error instanceof TaskNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la tarea seleccionada'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error contacta soporte'
      });
    }
  }
}
