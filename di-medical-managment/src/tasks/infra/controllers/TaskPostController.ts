import { Request, Response } from "express";
import { Controller } from "../../../shared/infra/Controller";
import { TaskCreator } from "../../application/Create/TaskCreator";
import { TaskId } from "../../domain/TaskId";
import { TaskTitle } from "../../domain/TaskTitle";
import { TaskDescription } from "../../domain/TaskDescription";
import { User } from "../../../shared/domain/User";
import { StringValueObject } from "../../../shared/domain/vo/StringValueObject";
import { TaskStatus } from "../../domain/TaskStatus";

export class TaskPostController implements Controller {
  constructor(
    private taskCreator: TaskCreator
  ) {}
  async run(req: Request, res: Response): Promise<any> {
    const { title, description, userAssignedId, status } = req.body
    await this.taskCreator.run({
      taskId: TaskId.random(),
      title: new TaskTitle(title),
      description: new TaskDescription(description),
      userAssigned: userAssignedId,
      status: new TaskStatus(status)
    })
    return res.json('Hola mundo')
  }
}
