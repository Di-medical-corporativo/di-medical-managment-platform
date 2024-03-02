import {  Request, Response, Router } from 'express'
import { TaskPostController } from '../controllers/TaskPostController'
import { ContainerBuilder } from 'node-dependency-injection'

export class TaskRouter {
  public static getRouter(container: ContainerBuilder) {
    const router = Router()
    const controller: TaskPostController = container.get('Tasks.controller.TaskPostController')
    router.post('/task/new', (req: Request, res: Response) => controller.run(req,res))
    return router
  }
}
