import { Request, Response } from "express";
import { Controller } from "../../../shared/infra/Controller";
import { TaskFinder } from "../../application/Finder/TaskFinder";

export class TaskGetController implements Controller {
  constructor(
    private taskFinder: TaskFinder
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    await res.status(200).send(this.taskFinder.run())
  }
}
