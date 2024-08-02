import { Request, Response } from "express";
import { SucursalUpdator } from "../../../../Contexts/Backoffice/Sucursal/application/Update/SucursalUpdator";
import { SucursalId } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SucursalPhone } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalPhone";
import { SucursalAddress } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalAddress";
import { Controller } from "../../../../Contexts/Shared/infra/Controller";
import { SucursalNotFound } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalNotFound";

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

      res.redirect('/backoffice/sucursal');
    } catch (error) {
      
      if(error instanceof SucursalNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la sucural'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
