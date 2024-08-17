import { TaskFinder } from "../../../../../Contexts/Backoffice/Task/domain/TaskFinder";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";
import { Request, Response } from "express";

export class TaskSearchController {
  constructor(
    private taskFinder: TaskFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = await this.taskFinder.run({
        id: new TaskId(id)
      });

      res.status(200).render('tasks/update', {
        task: task.toPrimitives()
      });
    } catch (error) {
      if(error instanceof TaskNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la tarea'
        });
      }

      res.status(500).render('error/erro', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
