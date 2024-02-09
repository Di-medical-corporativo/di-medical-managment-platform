import { Request, Response } from "express";
import { Controller } from "../../../shared/infra/Controller";
import { TaskCreator } from "../../application/Create/TaskCreator";

export class TaskPostController implements Controller {
  constructor(
    private taskCreator: TaskCreator
  ) {}
  async run(req: Request, res: Response): Promise<any> {
    await this.taskCreator.run()
    return res.json('Hola mundo')
  }
}
