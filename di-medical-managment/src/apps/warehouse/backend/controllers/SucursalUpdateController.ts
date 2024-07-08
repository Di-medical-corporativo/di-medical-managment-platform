import { Request, Response } from "express";
import { SucursalUpdator } from "../../../../Contexts/Warehouse/Sucursal/application/Update/SucursalUpdator";
import { SucursalId } from "../../../../Contexts/Warehouse/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../Contexts/Warehouse/Sucursal/domain/SucursalName";
import { SucursalPhone } from "../../../../Contexts/Warehouse/Sucursal/domain/SucursalPhone";
import { SucursalAddress } from "../../../../Contexts/Warehouse/Sucursal/domain/SucursalAddress";
import { Controller } from "../../../../Contexts/Shared/infra/Controller";
import { SucursalNotFound } from "../../../../Contexts/Warehouse/Sucursal/domain/SucursalNotFound";

export class SucursalUpdateController implements Controller {
  constructor(
    private sucursalUpdator: SucursalUpdator
  ) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;
    
    const  { name, phone, address } = req.body;
    
    try {
      await this.sucursalUpdator.run({
        id: new SucursalId(id),
        name: new SucursalName(name),
        phone: new SucursalPhone(phone),
        address: new SucursalAddress(address)
      });

      res.sendStatus(200);
    } catch (error) {
      
      if(error instanceof SucursalNotFound) {
        res.sendStatus(404);
      }
    }
  }
}
