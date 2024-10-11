import { Express } from "express";
import { Request, Response } from "express";

export const register = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    console.log(req.user);
    
    res.render('admin');
  });
}
