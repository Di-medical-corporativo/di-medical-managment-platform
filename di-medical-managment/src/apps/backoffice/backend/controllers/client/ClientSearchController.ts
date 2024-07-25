import { Request, Response } from "express";
import { ClientFinder } from "../../../../../Contexts/Backoffice/Client/domain/ClientFinder";
import { ClientNotFound } from "../../../../../Contexts/Backoffice/Client/domain/ClientNotFound";
import { ClientId } from "../../../../../Contexts/Backoffice/Client/domain/ClientId";

export class ClientSearchController  {
  constructor(
    private clientFinder: ClientFinder
  ) {}

  async run(req:  Request, res: Response) {
    try {
      const { id } = req.params;

      const client = await this.clientFinder.run({
        id: new ClientId(id)
      });

      res.status(200).render('clients/update', {
        clientData: client.toPrimitives()
      });
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
