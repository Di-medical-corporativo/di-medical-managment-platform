import {  Request, Response, Router } from 'express'
import { TaskPostController } from '../controllers/TaskPostController'
import { ContainerBuilder } from 'node-dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '.'

export class TaskRouter {
  public static getRouter(container: ContainerBuilder) {
    const schema = [
      body('title').exists().isString(),
      body('description').exists().isString(),
      body('userAssignedId').exists().isString(),
      body('startDate').exists().isString(),
      body('dueToDate').exists().isString()
    ]
    
    const router = Router()
    const controller: TaskPostController = container.get('Tasks.controller.TaskPostController')
    router.post('/task/new', schema, validateReqSchema, (req: Request, res: Response) => controller.run(req,res))
    return router
  }
}
