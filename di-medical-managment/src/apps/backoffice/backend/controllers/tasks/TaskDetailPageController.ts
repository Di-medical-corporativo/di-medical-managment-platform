import { TaskFinder } from "../../../../../Contexts/Backoffice/Task/domain/TaskFinder";
import { Request, Response } from "express";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { DepartmentSearcher } from "../../../../../Contexts/Backoffice/Department/application/SearchAll/DepartmentSearcher";
import { Department } from "../../../../../Contexts/Backoffice/Department/domain/Department";

export class TaskDetailPageController {
  constructor(
    private taskFinder: TaskFinder,
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = await this.taskFinder.run({
        id: new TaskId(id)
      });

      res.render('tasks/detail', {
        task: task.toPrimitives(),
      });
    } catch (error) {
      if(error instanceof TaskNotFound) {
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
