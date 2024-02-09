import {  Router } from 'express'
import { TaskPostController } from '../controllers/TaskPostController'
import { ContainerBuilder } from 'node-dependency-injection'

export class TaskRouter {
  public static getRouter(container: ContainerBuilder) {
    const router = Router()
    const controller: TaskPostController = container.get('Tasks.controller.TaskPostController')
    router.get('/test', controller.run.bind(controller))
    return router
  }
}
