import { Request, Response } from "express";
import { TaskFilter } from "../../../../../Contexts/Backoffice/Task/application/SearchCriteria/TaskFilter";
import { DeparmentId } from "../../../../../Contexts/Backoffice/Department/domain/DeparmentId";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { StatusList } from "../../../../../Contexts/Backoffice/Task/domain/TaskStatus";

export class TaskFilterKanbanController {
  constructor(
    private taskFilter: TaskFilter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { departmentId, asignedTo, asignedBy, status, date } = req.body;

      let department: DeparmentId | undefined = undefined;
      
      let userAssigned: UserId | undefined = undefined;

      let assigner: UserId | undefined = undefined;

      let taskStatus: StatusList | undefined;

      if(departmentId !== 'all') {
        department = new DeparmentId(departmentId)
      }

      if(asignedTo !== 'all') {
        userAssigned = new UserId(asignedTo);
      }

      if(asignedBy !== 'all') {
        assigner = new UserId(asignedBy);
      }

      if(status !== 'all') {
        taskStatus = status as StatusList;
      }

      const [ year, month ] = date.split('-');

      const startOfMonth: Date = new Date(year, month - 1, 1);

      const endOfMonth: Date = new Date(year, month, 1);

      const tasks = await this.taskFilter.run({
        endOfMonth: endOfMonth,
        startOfMonth: startOfMonth,
        asignedBy: assigner,
        asignedTo: userAssigned,
        status: taskStatus,
        departmentId: department
      });

      const plainTasks = tasks.map(t => t.toPrimitives());

      const assignedTasks = plainTasks.filter(task => task.status === StatusList.Assigned)

      const inProgressTasks = plainTasks.filter(task => task.status === StatusList.Progress);

      const completedTasks = plainTasks.filter(task => task.status === StatusList.Completed);

      const overdueTasks = plainTasks.filter(task => task.status === StatusList.PastDue);

      res.status(200).render('tasks/filter', {
        assignedTasks,
        inProgressTasks,
        completedTasks,
        overdueTasks
      });

    } catch (error) {
      console.log(error);

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
