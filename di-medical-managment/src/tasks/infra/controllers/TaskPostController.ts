import { Request, Response } from "express"
import { Controller } from "../../../shared/infra/Controller"
import { TaskCreator } from "../../application/Create/TaskCreator"
import { TaskId } from "../../domain/TaskId"
import { TaskTitle } from "../../domain/TaskTitle"
import { TaskDescription } from "../../domain/TaskDescription"
import { UserAssignedId } from "../../domain/UserAssignedId"
import { TaskStartDate } from "../../domain/TaskStartDate"
import { TaskDueToDate } from "../../domain/TaskDueToDate"


interface CreateTaskRequest extends Request {
  body: {
    title: string;
    description: string;
    userAssignedId: string;
    startDate: string;
    dueToDate: string;
  };
}

export class TaskPostController implements Controller {
  constructor(
    private taskCreator: TaskCreator
  ) {}

  async run(req: CreateTaskRequest, res: Response): Promise<any> {
    const { title, description, userAssignedId, startDate, dueToDate } = req.body
  
    await this.taskCreator.run({
      taskId: TaskId.random(),
      title: new TaskTitle(title),
      description: new TaskDescription(description),
      userAssigned: new UserAssignedId(userAssignedId),
      startedDate: new TaskStartDate(startDate),
      dueToDate: new TaskDueToDate(dueToDate)
    })
  }
}
