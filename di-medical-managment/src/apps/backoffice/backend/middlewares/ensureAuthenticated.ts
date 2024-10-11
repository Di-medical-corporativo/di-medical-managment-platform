import { Request, Response } from "express";

export function ensureAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
      return next();
  }

  res.redirect('/login');
}
