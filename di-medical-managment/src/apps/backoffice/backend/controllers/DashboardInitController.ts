import { Request, Response } from "express";
import { UserKanbanGenerator } from "../../../../Contexts/Backoffice/Task/application/UserKanban/UserKanbanGenerator";
import { UserId } from "../../../../Contexts/Backoffice/User/domain/UserId";
import { InvalidCredentials } from "../../../../Contexts/Shared/domain/InvalidCredentials";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
}

export default class DashBoardInitController {
  constructor(
    private userKanbanGenerator: UserKanbanGenerator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const user = req.user as (User | undefined);

      if(!user) throw new InvalidCredentials();

      const { filter } = req.query as { filter?: string } as { filter?: string };; 

      let dateToFilter = new Date();

      let monthToFilter: number = dateToFilter.getMonth() + 1;

      let yearToFilter: number = dateToFilter.getFullYear();  

      if(filter) {
        const [year, monthNumber] = filter.split('-');
        
        yearToFilter = parseInt(year, 10);

        monthToFilter = parseInt(monthNumber, 10);
      }

      const { 
        assignedTasks, 
        completedTasks, 
        inProgressTasks, 
        overdueTasks 
      } = await this.userKanbanGenerator.run({
        id: new UserId(user.id),
        month: monthToFilter,
        year: yearToFilter
      });

      res.status(200).render('admin', {
        user,
        assignedTasks: assignedTasks.map(a => a.toPrimitives()),
        completedTasks: completedTasks.map(c => c.toPrimitives()),
        inProgressTasks: inProgressTasks.map(i => i.toPrimitives()),
        overdueTasks: overdueTasks.map(o => o.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
