import { TaskCreator } from "../../../../../Contexts/Backoffice/Task/application/Create/TaskCreator";
import { Request, Response } from "express";
import { UserSearcher } from "../../../../../Contexts/Backoffice/User/application/SearchAll/UserSearcher";

export class TaskCreateController {
  constructor(
    private taskCreator: TaskCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
