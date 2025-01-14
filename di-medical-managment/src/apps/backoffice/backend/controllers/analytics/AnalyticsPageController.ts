import { Request, Response } from "express";
import { UserSearcher } from "../../../../../Contexts/Backoffice/User/application/SearchAll/UserSearcher";
import { User } from "../../../../../Contexts/Backoffice/User/domain/User";

export class AnalyticsPageController {
  constructor(
    private userSearcher: UserSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const userList: User[] = await this.userSearcher.run();

      res.status(200).render('analytics/main', {
        userList: userList.map(u => u.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
