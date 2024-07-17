import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { ClientUpdator } from "../../../../../Contexts/Backoffice/Client/application/Update/ClientUpdator";
import { ClientId } from "../../../../../Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../Contexts/Backoffice/Client/domain/ClientName";
import { ClientAddress } from "../../../../../Contexts/Backoffice/Client/domain/ClientAddress";
import { ClientNotFound } from "../../../../../Contexts/Backoffice/Client/domain/ClientNotFound";

export class ClientUpdateController implements Controller {
  
  constructor(
    private clientUpdator: ClientUpdator
  ) {}
  
  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, address } = req.body;

      await this.clientUpdator.run({
        id: new ClientId(id),
        name: new ClientName(name),
        address: new ClientAddress(address)
      });

      res.sendStatus(200);
    } catch (error) {
      if(error instanceof ClientNotFound) {
        res.sendStatus(404);
      }

      res.sendStatus(500);
    }
    
  }
}
