import { NextFunction } from "express";
import { Request, Response } from "express";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  modules: { id: string; name: string }[];
}

export const authorizeModule = (module: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as (User | undefined);

    if (!user) {
      return res.render('/login');
    }

    const modules = user.modules.map(m => m.name);

    if (!modules.includes(module)) {
      return res.status(403).render('error/auth', { message: 'No tienes permiso para ver este recurso' });
    }

    next();
  };
};
