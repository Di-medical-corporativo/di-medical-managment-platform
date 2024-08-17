import { TaskUpdator } from "../../../../../Contexts/Backoffice/Task/application/Update/TaskUpdator";
import { Request, Response } from "express";
import { TaskNotFound } from "../../../../../Contexts/Backoffice/Task/domain/TaskNotFound";
import { TaskId } from "../../../../../Contexts/Backoffice/Task/domain/TaskId";
import { TaskDescription } from "../../../../../Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskTitle } from "../../../../../Contexts/Backoffice/Task/domain/TaskTitle";

export class TaskUpdateController {
  constructor(
    private taskUpdator: TaskUpdator
 ) {}

 async run(req: Request, res: Response) {
  try {
    const { id, title, description, dueTo } = req.body;

    await this.taskUpdator.run({
      id: new TaskId(id),
      description: new TaskDescription(description),
      dueTo: new TaskDueTo(new Date(dueTo).toISOString()),
      title: new TaskTitle(title)
    });

    res.redirect('/backoffice/task');
  } catch (error) {
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
