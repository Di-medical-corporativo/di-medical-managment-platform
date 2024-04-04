import { Request, Response } from "express";
import { Controller } from "../../../shared/infra/Controller";
import { TaskFinder } from "../../application/Finder/TaskFinder";
import { FiltersPrimitives } from "../../../shared/domain/criteria/Filter";

export class TaskGetController implements Controller {
  constructor(
    private taskFinder: TaskFinder
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const { query: queryParams } = req
    const { filters, orderBy = null, order = null } = queryParams
    const tasks = await this.taskFinder.run(
      filters as FiltersPrimitives[], 
      orderBy as string, 
      order as string
    )
    
    const taskPrimitives = tasks.map((task) => task.toPrimitives())
    res.status(200).send(taskPrimitives)
  }
}
