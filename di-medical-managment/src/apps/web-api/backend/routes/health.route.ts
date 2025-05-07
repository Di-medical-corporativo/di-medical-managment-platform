import { Express, Request, Response } from "express";

export const register = (app: Express) => {
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  }); 
}
