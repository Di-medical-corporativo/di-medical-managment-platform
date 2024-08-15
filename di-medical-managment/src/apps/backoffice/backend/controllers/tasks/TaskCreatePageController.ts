import { UserSearcher } from "../../../../../Contexts/Backoffice/User/application/SearchAll/UserSearcher";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";

export class TaskCreatePageController {
  constructor(
    private userSearcher: UserSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const id = uuid();

      const users = await this.userSearcher.run();

      res.render('tasks/create', {
        id,
        users: users.map(u => u.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
