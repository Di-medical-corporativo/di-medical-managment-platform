import { NextFunction } from "express";
import { Request, Response } from "express";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  role: string;
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as (User | undefined);

    if (!user) {
      return res.render('/login');
    }

    if (!roles.includes(user.role)) {
      return res.status(403).render('error/error', { message: 'No tienes permiso para ver este recurso' });
    }

    next();
  };
};
