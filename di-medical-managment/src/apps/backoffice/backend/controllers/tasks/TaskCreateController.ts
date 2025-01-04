import { TaskCreator } from "../../../../../Contexts/Backoffice/Task/application/Create/TaskCreator";
import { Request, Response } from "express";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { TaskDescription } from "../../../../../Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskTitle } from "../../../../../Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskDueTo } from "../../../../../Contexts/Backoffice/Task/domain/TaskDueTo";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { DeparmentId } from "../../../../../Contexts/Backoffice/Department/domain/DeparmentId";
import { DepartmentNotFound } from "../../../../../Contexts/Backoffice/Department/domain/DepartmentNotFound";

export class TaskCreateController {
  constructor(
    private taskCreator: TaskCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, title, description, userId, dueTo, departmentId } = req.body;

      await this.taskCreator.run({
        id: new TaskId(id),
        description:  new TaskDescription(description),
        title: new TaskTitle(title),
        dueTo: new TaskDueTo(new Date(dueTo).toISOString()),
        userId: new UserId(userId),
        departmentId: new DeparmentId(departmentId)
      });

      res.redirect('/backoffice/task');
    } catch (error) {
      if(error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario seleccionado'
        });
      } else if(error instanceof DepartmentNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el departamento seleccionado'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
