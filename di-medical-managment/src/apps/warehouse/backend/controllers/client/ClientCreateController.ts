import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { ClientCreator } from "../../../../../Contexts/Warehouse/Client/application/Create/ClientCreator";
import { ClientId } from "../../../../../Contexts/Warehouse/Client/domain/ClientId";
import { ClientName } from "../../../../../Contexts/Warehouse/Client/domain/ClientName";
import { ClientAddress } from "../../../../../Contexts/Warehouse/Client/domain/ClientAddress";

export class ClientCreateController implements Controller {
  constructor(
    private clientCreator: ClientCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id, name, address } = req.body;

    await this.clientCreator.run({
      id: new ClientId(id),
      name: new ClientName(name),
      address: new ClientAddress(address)
    });

    res.sendStatus(201);
  }
}
