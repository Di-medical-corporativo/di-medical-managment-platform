import express, { Express } from 'express'

import { useContainer, useExpressServer } from 'routing-controllers'
import Container, { Service } from 'typedi'
import helmet from 'helmet'
import { ServerI } from './shared/application/Server'
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
import { ContainerBuilder } from 'node-dependency-injection'
import { RoleRouter } from './roles/infra/routes/RoleRouter'

@Service()
export class Server {
  private readonly PORT: number = 3000
  private readonly _app: Express
  private serverInstance: any;
  constructor (
    private container: ContainerBuilder
  ) {
    this._app = express()
    this.initMiddlewares()
    this.initRoutes(this.container)
    useContainer(Container)
    useExpressServer(this._app, {
      development: true,
      validation: true,
      cors: true,
      classTransformer: true,
      controllers: [
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
    this._app.use(RoleRouter.getRouter(container))
  }

  public start (): void {
    this.serverInstance = this._app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`)
    })
  }

  public stop(): void {
    if (this.serverInstance) {
      this.serverInstance.close((err: any) => {
        if (err) {
          console.error('Error closing the server:', err);
        } else {
          console.log('Server stopped.');
        }
      });
    }
  }

  public getHttpServer() {
    if(this.serverInstance) {
      return this.serverInstance
    }

    return null
  }

  public get app (): Express {
    return this._app
  }
}
