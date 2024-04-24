import { Request, Response } from "express"
import { Controller } from "../../../shared/infra/Controller"
import { TaskCreator } from "../../application/Create/TaskCreator"
import { TaskId } from "../../domain/TaskId"
import { TaskTitle } from "../../domain/TaskTitle"
import { TaskDescription } from "../../domain/TaskDescription"
import { UserAssignedId } from "../../domain/UserAssignedId"
import { TaskStartDate } from "../../domain/TaskStartDate"
import { TaskDueToDate } from "../../domain/TaskDueToDate"
import { UserAssignedName } from "../../domain/UserAssignedName"
import { UserAssignedPicture } from "../../domain/UserAssignedPicture"

interface CreateTaskRequest extends Request {
  body: {
    title: string;
    description: string;
    userAssignedId: string;
    userAssignedName: string;
    userAssignedPicture: string;
    startDate: string;
    dueToDate: string;
  }
}

export class TaskPostController implements Controller {
  constructor(
    private taskCreator: TaskCreator
  ) { }

  async run(req: CreateTaskRequest, res: Response): Promise<any> {
    try {
      const { title, description, userAssignedId, userAssignedName, userAssignedPicture, startDate, dueToDate } = req.body
      await this.taskCreator.run({
        taskId: TaskId.random(),
        title: new TaskTitle(title),
        description: new TaskDescription(description),
        userAssigned: new UserAssignedId(userAssignedId),
        userAssignedName: new UserAssignedName(userAssignedName),
        userAssignedPicture: new UserAssignedPicture(userAssignedPicture),
        startedDate: new TaskStartDate(new Date(startDate)),
        dueToDate: new TaskDueToDate(new Date(dueToDate))
      })

      res.status(201).send()
    } catch (error) {
      res.status(500).send()
    }
  }
}
