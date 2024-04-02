import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../../shared/infra/Controller";

export class TaskGetController implements Controller {
  run(req: Request, res: Response): Promise<void> {
    throw new Error()
  }
}
