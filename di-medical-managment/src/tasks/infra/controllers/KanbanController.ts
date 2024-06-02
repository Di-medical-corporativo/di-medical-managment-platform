import { Request, Response } from "express";
import { Controller } from "../../../shared/infra/Controller";
import { TaskSearchAll } from "../../application/SearchAll/TaskSearchAll";

export class TaskKanbanController implements Controller {
  constructor(
    private taskSearchAll: TaskSearchAll
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskSearchAll.run()
    res.status(200).send(tasks)
  }
}
