import express, { Express } from 'express'

import { useContainer, useExpressServer } from 'routing-controllers'
import Container, { Inject, Service } from 'typedi'
import helmet from 'helmet'
import path from 'path'

import { LoggerI } from './shared/application/LoggerInterface'
import { ServerI } from './shared/application/Server'
import { Logger } from './shared/application/Logs4js'
import { RoleRestController } from './auth/infra/api/RoleController'
import { ResourceRestController } from './auth/infra/api/ResourceController'
import { UserRestController } from './shared/infra/api/UserController'
import { SucursalRestController } from './shared/infra/api/SucursalController'
import { AuthRestController } from './auth/infra/api/AuthController'
import { BaseError } from './shared/domain/errors/Error'
import { UnknowError } from './auth/domain/Errors'
import { TruckRestController } from './fleet/infra/api/TruckController'
import { ClientRestController } from './fleet/infra/api/ClientController'
import { ItineraryRestController } from './fleet/infra/api/ItineraryController'
import { SurveyRestController } from './survey/infra/api/SurveyController'
import { TaskRouter } from './tasks/infra/routes/TaskRouter'
import { ContainerBuilder, JsonFileLoader } from 'node-dependency-injection'


@Service()
export class Server implements ServerI {
  private readonly PORT: number = 3000
  private readonly _app: Express
  constructor (
    @Inject(() => Logger)
    private readonly _logger: LoggerI
  ) {
    this._app = express()
    this.initMiddlewares()
    useContainer(Container)
    useExpressServer(this._app, {
      development: true,
      validation: true,
      cors: true,
      classTransformer: true,
      controllers: [
        RoleRestController,
        ResourceRestController,
        UserRestController,
        SucursalRestController,
        AuthRestController,
        TruckRestController,
        ClientRestController,
        ItineraryRestController,
        SurveyRestController
      ]
    })
    .use((err: any, req: any, res: any, next: any) => {
      if(err instanceof BaseError) {
        return res.status(err.status).json(err)
      }

      return res.status(500).json({ error: new UnknowError() })
    })
  }

  private initMiddlewares (): void {
    this._app.use(express.json())
    this._app.use(helmet())
  }
  

  private initRoutes (container: any) {
    this._app.use(TaskRouter.getRouter(container))
  }

  public start (container: any): void {
    this.initRoutes(container)
    this._app.listen(this.PORT, () => {
      this._logger.info(`Server running on port ${this.PORT}`)
    })
  }

  public get app (): Express {
    return this._app
  }
}
