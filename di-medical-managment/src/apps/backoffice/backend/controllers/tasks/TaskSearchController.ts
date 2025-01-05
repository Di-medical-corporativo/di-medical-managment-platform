import { DepartmentSearcher } from "../../../../../Contexts/Backoffice/Department/application/SearchAll/DepartmentSearcher";
import { Department } from "../../../../../Contexts/Backoffice/Department/domain/Department";
import { TaskFinder } from "../../../../../Contexts/Backoffice/Task/domain/TaskFinder";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";
import { Request, Response } from "express";

export class TaskSearchController {
  constructor(
    private taskFinder: TaskFinder,
    private departmentSearcher: DepartmentSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = await this.taskFinder.run({
        id: new TaskId(id)
      });

      const departments: Department[] = await this.departmentSearcher.run();

      res.status(200).render('tasks/update', {
        task: task.toPrimitives(),
        departments: departments.map(d => d.toPrimitives())
      });
    } catch (error) {
      console.log(error);
      if(error instanceof TaskNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la tarea'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
