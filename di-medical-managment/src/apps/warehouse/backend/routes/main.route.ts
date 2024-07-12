import { Express } from "express";
import { Request, Response } from "express";

export const register = (app: Express) => {
  app.post('/almacen/', (req: Request, res: Response) => res.render('dashboard'));
}
