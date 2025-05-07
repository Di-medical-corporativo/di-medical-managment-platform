import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import * as http from 'http';
import cors from 'cors';
import { registerRoutes } from './routes';

export class Server {
  private express: express.Express;
  
  readonly port: string;
  
  private logger = console;
  
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    
    this.express = express();

    this.express.use(bodyParser.json());
    
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.use(helmet.xssFilter());
    
    this.express.use(helmet.noSniff());
    
    this.express.use(helmet.hidePoweredBy());

    this.express.use(helmet.frameguard({ action: 'deny' }));
  
    const router = Router();
    
    this.express.use(cors());
    
    this.express.use('/api', router);
    
    registerRoutes(router);

    router.use((req: Request, res: Response, next: Function) => {
      res.locals.currentPath = req.path;
      
      next();
    });

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err);
      
      res.status(500).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(Number(this.port), '0.0.0.0', () => {
      
        this.logger.info(
          `Web Api App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
      
        this.logger.info('Press CTRL-C to stop\n');
      
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> { 
    return new Promise((resolve, reject) => {
    
      if (this.httpServer) {
    
        this.httpServer.close(error => {
    
          if (error) {
            return reject(error);
          }
    
          return resolve();
    
        });
      }

      return resolve();
    });
  }
}
