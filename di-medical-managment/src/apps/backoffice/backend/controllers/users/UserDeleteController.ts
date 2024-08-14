import { UserDeleter } from "../../../../../Contexts/Backoffice/User/application/Delete/UserDeleter";
import { Request, Response } from "express";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";

export class UserDeleteController {
  constructor(
    private userDeleter: UserDeleter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.userDeleter.run({ id: new UserId(id) });
      
      res.redirect('/backoffice/user');
    } catch (error) {
      if(error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario'
        });
      }
      
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
