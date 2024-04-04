import {  Request, Response, Router } from 'express'
import { TaskPostController } from '../controllers/TaskPostController'
import { ContainerBuilder } from 'node-dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '.'
import { TaskGetController } from '../controllers/TaskGetController'

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
    const postController: TaskPostController = container.get('Tasks.controller.TaskPostController')
    const getController: TaskGetController = container.get('Task.controller.TaskGetController')
    router.post('/task/new', schema, validateReqSchema, (req: Request, res: Response) => postController.run(req,res))
    router.get('/task/', (req: Request, res: Response) => getController.run(req, res))
    return router
  }
}
