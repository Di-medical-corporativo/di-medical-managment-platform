import express, { Express } from 'express'
import helmet from 'helmet'
import { TaskRouter } from './tasks/infra/routes/TaskRouter'
import { ContainerBuilder } from 'node-dependency-injection'
import { SucursalRouter } from './sucursal/infra/routes/SucursalRouter'

export class Server {
  private readonly PORT: number = 3000
  private readonly _app: Express
  private serverInstance: any;
  constructor (
    private container: ContainerBuilder
  ) {
    this._app = express();
    this.initMiddlewares();
    this.initRoutes(this.container);
  }

  private initMiddlewares (): void {
    this._app.use(express.json());
    this._app.use(helmet());
  }
  
  private initRoutes (container: any) {
    this._app.use(TaskRouter.getRouter(container));
    this._app.use(SucursalRouter.getRouter(container));
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
