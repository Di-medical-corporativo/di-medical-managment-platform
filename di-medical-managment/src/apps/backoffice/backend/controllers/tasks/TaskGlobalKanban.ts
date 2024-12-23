import { TaskSearcher } from "../../../../../Contexts/Backoffice/Task/application/SearchAll/TaskSearcher";
import { Request, Response } from "express";
import { StatusList } from "../../../../../Contexts/Backoffice/Task/domain/TaskStatus";

export class TaskGlobalKanban {
  constructor(
    private taskSearcher: TaskSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { filter } = req.query as { filter?: string } as { filter?: string };; 

      let dateToFilter = new Date();

      let monthToFilter: number = dateToFilter.getMonth() + 1;

      let yearToFilter: number = dateToFilter.getFullYear();      

      if(filter) {
        const [year, monthNumber] = filter.split('-');
        
        yearToFilter = parseInt(year, 10);

        monthToFilter = parseInt(monthNumber, 10);
      }

      const tasks = await this.taskSearcher.run({
        month: monthToFilter,
        year: yearToFilter
      });

      const plainTasks = tasks.map(t => t.toPrimitives());

      const assignedTasks = plainTasks.filter(task => task.status === StatusList.Assigned)

      const inProgressTasks = plainTasks.filter(task => task.status === StatusList.Progress);

      const completedTasks = plainTasks.filter(task => task.status === StatusList.Completed);

      const overdueTasks = plainTasks.filter(task => task.status === StatusList.PastDue);

      res.status(200).render('tasks/main', {
        assignedTasks,
        inProgressTasks,
        completedTasks,
        overdueTasks
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
