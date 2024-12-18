import { Request, Response } from "express";
import { Controller } from "../../../../Contexts/Shared/infra/Controller";
import { SucursalCreator } from "../../../../Contexts/Backoffice/Sucursal/application/Create/SucursalCreator";
import { SucursalId } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SucursalAddress } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalAddress";
import { SucursalPhone } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalPhone";

export class SucursalCreateController implements Controller {
  constructor(
    private sucursalCreator: SucursalCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { address, id, name, phone } = req.body;

      await this.sucursalCreator.run({
        id: new SucursalId(id),
        name: new SucursalName(name),
        address: new SucursalAddress(address),
        phone: new SucursalPhone(phone)
      });
    
      res.redirect('/backoffice/sucursal');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
