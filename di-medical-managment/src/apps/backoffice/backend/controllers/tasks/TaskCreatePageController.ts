import { UserSearcher } from "../../../../../Contexts/Backoffice/User/application/SearchAll/UserSearcher";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { DepartmentSearcher } from "../../../../../Contexts/Backoffice/Department/application/SearchAll/DepartmentSearcher";
import { Department } from "../../../../../Contexts/Backoffice/Department/domain/Department";

export class TaskCreatePageController {
  constructor(
    private userSearcher: UserSearcher,
    private departmentSearcher: DepartmentSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const id = uuid();

      const users = await this.userSearcher.run();

      const departments: Department[] = await this.departmentSearcher.run();

      res.render('tasks/create', {
        id,
        users: users.map(u => u.toPrimitives()),
        departments: departments.map(d => d.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
