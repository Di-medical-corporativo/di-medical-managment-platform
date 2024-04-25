import {  Request, Response, Router } from 'express'
import { TaskPostController } from '../controllers/TaskPostController'
import { ContainerBuilder } from 'node-dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '.'
import { TaskGetController } from '../controllers/TaskGetController'
import { TaskSearchAllController } from '../controllers/TaskSearchAllController'
import { TaskPutController } from '../controllers/TaskPutController'

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
    const searchAllController: TaskSearchAllController = container.get('Task.controller.TaskSearchAllController')
    const putController: TaskPutController = container.get('Task.controller.TaskPutController')

    router.post('/tasks/new', schema, validateReqSchema, (req: Request, res: Response) => postController.run(req,res))
    router.get('/tasks/', (req: Request, res: Response) => getController.run(req, res))
    router.get('/tasks/kanban', (req: Request, res: Response) => searchAllController.run(req, res))
    router.put('/tasks/:taskId', (req: Request & { params: { taskId: string } }, res: Response) => putController.run(req, res))
    return router
  }
}
