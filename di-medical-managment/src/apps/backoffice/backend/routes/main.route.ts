import { Express } from "express";
import { Request, Response } from "express";

export const register = (app: Express) => {
  app.get('/backoffice/', (req: Request, res: Response) => res.render('admin'));
}
