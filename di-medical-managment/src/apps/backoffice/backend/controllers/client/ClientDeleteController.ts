import { Request, Response } from "express";
import { ClientDeleter } from "../../../../../Contexts/Backoffice/Client/application/Delete/ClientDeleter";
import { ClientId } from "../../../../../Contexts/Backoffice/Client/domain/ClientId";
import { ClientNotFound } from "../../../../../Contexts/Backoffice/Client/domain/ClientNotFound";


export class ClientDeleteController {
  constructor(
    private clientDeleter: ClientDeleter
  ) {}

  async run(req: Request, res: Response) {
   try {
      const { id } = req.body;

      await  this.clientDeleter.run({
        id: new ClientId(id)
      });

      res.redirect('/backoffice/client');
   } catch (error) {
    if(error instanceof ClientNotFound) {
      res.status(404).render('error/error', {
        message: 'No se encontro el cliente'
      });
    }

    res.status(500).render('error/error', {
      message: 'Ocurrio un error, contacta soporte'
    });
   }
  }
}
