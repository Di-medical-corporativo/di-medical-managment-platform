import { Request, Response } from "express";
import { Controller } from "../../../shared/infra/Controller";
import { TaskUpdator } from "../../application/Update/TaskUpdator";

interface UpdateTaskRequest extends Request {
  body: {
    status?: string;
    title?: string;
    description?: string;
    dueToDate?: string;
  },
  params: {
    taskId: string;
  }
}

export class TaskPutController implements Controller {
  constructor(
    private taskUpdator: TaskUpdator
  ) {}

  async run(req: UpdateTaskRequest, res: Response): Promise<void> {
    try {
      const updateValues = req.body
      const { taskId } = req.params
      await this.taskUpdator.run(taskId, updateValues)
      res.status(200).send(updateValues)
    } catch (error) {
      res.status(500).send()
    }
  }

}
