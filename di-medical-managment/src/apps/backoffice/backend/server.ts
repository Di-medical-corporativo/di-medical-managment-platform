import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import * as http from 'http';
import { registerRoutes } from './routes';
import cors from 'cors';
import path from "path";
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { AuthenticateUser } from '../../../Contexts/Shared/application/Auth/AuthenticateUser';
import { PrismaUserRepository } from '../../../Contexts/Backoffice/User/infra/persistence/PrismaUserRepository';
import { UserEmail } from '../../../Contexts/Backoffice/User/domain/UserEmail';
import { AuthenticatedUserFinder } from '../../../Contexts/Shared/domain/AuthenticatedUserFinder';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { UserNotFound } from '../../../Contexts/Backoffice/User/domain/UserNotFound';
import { InvalidCredentials } from '../../../Contexts/Shared/domain/InvalidCredentials';

export class Server {
  private express: express.Express;
  
  readonly port: string;
  
  private logger = console;
  
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    
    this.express = express();

    this.express.use(express.static(path.join(__dirname, '../frontend/public')));

    this.express.set('view engine', 'ejs');
    
    this.express.set('views', path.join(__dirname, '../frontend/views'));
    
    this.express.use(bodyParser.json());
    
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.use(methodOverride('_method'));
    
    this.express.use(helmet.xssFilter());
    
    this.express.use(helmet.noSniff());
    
    this.express.use(helmet.hidePoweredBy());

    this.express.use(helmet.frameguard({ action: 'deny' }));
    
    this.express.use(session(
      {
        secret: 'MY-SECRET',
        resave: false,
        saveUninitialized: false
      }
    ));

    this.express.use(passport.initialize());

    this.express.use(passport.session());

    const repository = new PrismaUserRepository();

    const authenticateUser = new AuthenticateUser(repository);

    const authenticatedUserFinder = new AuthenticatedUserFinder(repository);
   
    passport.use(new Strategy(async (email: string, password: string, done) => {
      try {
        const user = await authenticateUser.run({
          email: new UserEmail(email),
          password
        });

        const { password: passwordInfo, ...userInfo } = user.toPrimitives();

        done(null, userInfo);
      } catch (error) {
        if(error instanceof UserNotFound) {
          return done(null, false, { message: 'No se encontró el usuario' });
        }
    
        if(error instanceof InvalidCredentials) {
          return done(null, false, { message: 'Credenciales incorrectas, intenta de nuevo' });
        }
    
        return done(null, false, { message: 'Ocurrió un error, intenta de nuevo' });
      }
    }));

    passport.serializeUser((user: any, done) => {
      const { email } = user;
      
      done(null, email);
    });

    passport.deserializeUser(async (email: string, done) => {
      try {
        const user = await authenticatedUserFinder.run({
          email: new UserEmail(email)
        });

        const { password: passwordInfo, ...userInfo } = user.toPrimitives();
        
        done(null, userInfo);
      } catch (error) {
        done(error);
      }
    });

    const router = Router();
    
    this.express.use(cors());
    
    this.express.use('/backoffice', ensureAuthenticated, router);

    this.express.get('/login', (req: Request, res: Response) => {
      res.status(200).render('login/login')
    });

    this.express.post('/login', passport.authenticate('local', {
      successRedirect: '/backoffice',
      failureRedirect: '/login'
    }));

    this.express.post('/logout', (req: Request, res: Response, next) => {
      req.logout(err => {
        if(err) {
          next(err);
        }

        res.redirect('/login');
      });
    });
    
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
      this.httpServer = this.express.listen(this.port, () => {
      
        this.logger.info(
          `Backoffice Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
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
