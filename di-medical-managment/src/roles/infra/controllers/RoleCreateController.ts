import { Request, Response } from "express";
import { Controller } from "../../../shared/infra/Controller";
import { TaskCreator } from "../../../tasks/application/Create/TaskCreator";

export class RoleCreateController implements Controller {
  constructor(
    private readonly taskCreator: TaskCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    await res.status(201).send()
  }
}
