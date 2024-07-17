import { Request, Response } from "express";
import { Controller } from "../../../../Contexts/Shared/infra/Controller";
import { SucursalCreator } from "../../../../Contexts/Backoffice/Sucursal/application/Create/SucursalCreator";
import { SucursalId } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SucursalAddress } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalAddress";
import { SucursalPhone } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalPhone";

interface CreateRequest extends Request {
  body: {
    id: string;
    name: string;
    address: string;
    phone: string;
  }
}

export class SucursalCreateController implements Controller {
  constructor(
    private sucursalCreator: SucursalCreator
  ) {}

  async run(req: CreateRequest, res: Response): Promise<void> {
    const { address, id, name, phone } = req.body;

    await this.sucursalCreator.run({
      id: new SucursalId(id),
      name: new SucursalName(name),
      address: new SucursalAddress(address),
      phone: new SucursalPhone(phone)
    });
    
    res.status(201).send();
  }
}
