import { Express } from "express";
import { Request, Response } from "express";

export const register = (app: Express) => {
  
  app.post('/managment/', (req: Request, res: Response) => res.render('dashboard'));
}
