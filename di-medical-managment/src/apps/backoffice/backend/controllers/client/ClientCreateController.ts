import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { ClientCreator } from "../../../../../Contexts/Backoffice/Client/application/Create/ClientCreator";
import { ClientId } from "../../../../../Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../Contexts/Backoffice/Client/domain/ClientName";
import { ClientAddress } from "../../../../../Contexts/Backoffice/Client/domain/ClientAddress";

export class ClientCreateController implements Controller {
  constructor(
    private clientCreator: ClientCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, address } = req.body;
  
      await this.clientCreator.run({
        id: new ClientId(id),
        name: new ClientName(name),
        address: new ClientAddress(address)
      });
  
      res.status(201).redirect('/backoffice/client');
    } catch (error) {
      res.render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
