import { Request, Response } from "express";
import { UserKanbanGenerator } from "../../../../Contexts/Backoffice/Task/application/UserKanban/UserKanbanGenerator";
import { UserId } from "../../../../Contexts/Backoffice/User/domain/UserId";
import { UserOverviewer } from "../../../../Contexts/Backoffice/User/application/Overview/UserOverviewer";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  modules: { id: string; name: string }[];
}

export default class DashBoardInitController {
  constructor(
    private userKanbanGenerator: UserKanbanGenerator,
    private userOverviewer: UserOverviewer
  ) {}

  async run(req: Request, res: Response) {
    try {
      const user = req.user as (User | undefined);

      if(!user) {
        res.status(400).redirect('/login');

        return;
      }

      const { filter } = req.query as { filter?: string } as { filter?: string };; 

      let dateToFilter: Date = new Date();

      let monthToFilter: number = dateToFilter.getMonth() + 1;

      let yearToFilter: number = dateToFilter.getFullYear();  

      if(filter) {
        const [year, monthNumber] = filter.split('-');
        
        yearToFilter = parseInt(year, 10);

        monthToFilter = parseInt(monthNumber, 10);
      }

      const overview = await this.userOverviewer.run({
        userId: new UserId(user.id)
      });

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
        assignedTasks: assignedTasks.map(a => a.toPrimitives()),
        completedTasks: completedTasks.map(c => c.toPrimitives()),
        inProgressTasks: inProgressTasks.map(i => i.toPrimitives()),
        overdueTasks: overdueTasks.map(o => o.toPrimitives()),
        user,
        yearToFilter,
        month: this.getMonthName(monthToFilter),
        overview
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }

  private getMonthName(monthNumber: number) {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthNumber - 1]; 
  }
}
