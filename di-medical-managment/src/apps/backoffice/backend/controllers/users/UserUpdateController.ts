import { UserUpdator } from "../../../../../Contexts/Backoffice/User/application/Update/UserUpdator";
import { Request, Response } from "express";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { UserFirstName } from "../../../../../Contexts/Backoffice/User/domain/UserFirstName";
import { UserLastName } from "../../../../../Contexts/Backoffice/User/domain/UserLastName";
import { UserJob } from "../../../../../Contexts/Backoffice/User/domain/UserJob";
import { UserPhone } from "../../../../../Contexts/Backoffice/User/domain/UserPhone";
import { UserEmail } from "../../../../../Contexts/Backoffice/User/domain/UserEmail";
import { SucursalId } from "../../../../../Contexts/Backoffice/Sucursal/domain/SucursalId";
import { UserDate } from "../../../../../Contexts/Backoffice/User/domain/UserDate";
import { SucursalNotFound } from "../../../../../Contexts/Backoffice/Sucursal/domain/SucursalNotFound";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { ModuleId } from "../../../../../Contexts/Shared/domain/ModuleId";

export class UserUpdateController {
  constructor(
    private userUpdator: UserUpdator
  ) {}

  async run(req: Request, res: Response) {
    const { id, firstName, lastName, job, phone, email, modules = [], sucursalId, password } = req.body;

    try {
      await this.userUpdator.run({
        id: new UserId(id),
        firstName: new UserFirstName(firstName),
        lastName: new UserLastName(lastName),
        job: new UserJob(job),
        phone: new UserPhone(phone),
        email: new UserEmail(email),
        modulesIds: modules.map((m: string) => new ModuleId(m)),
        sucursalId: new SucursalId(sucursalId),
        createdAt: new UserDate(new Date().toISOString()),
        password
      });

      res.redirect('/backoffice/user')
    } catch (error) {
      if(error instanceof SucursalNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la sucursal seleccionada'
        });
      }

      if(error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario seleccionado'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
