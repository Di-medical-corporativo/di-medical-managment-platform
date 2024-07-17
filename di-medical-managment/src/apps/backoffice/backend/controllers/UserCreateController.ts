import { Request, Response } from "express";
import { Controller } from "../../../../Contexts/Shared/infra/Controller";
import { UserCreator } from "../../../../Contexts/Backoffice/User/application/Create/UserCreator";
import { UserId } from "../../../../Contexts/Backoffice/User/domain/UserId";
import { UserFirstName } from "../../../../Contexts/Backoffice/User/domain/UserFirstName";
import { UserLastName } from "../../../../Contexts/Backoffice/User/domain/UserLastName";
import { UserJob } from "../../../../Contexts/Backoffice/User/domain/UserJob";
import { UserPhone } from "../../../../Contexts/Backoffice/User/domain/UserPhone";
import { UserEmail } from "../../../../Contexts/Backoffice/User/domain/UserEmail";
import { UserIsAdmin } from "../../../../Contexts/Backoffice/User/domain/UserIsAdmin";
import { SucursalId } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalId";
import { UserDate } from "../../../../Contexts/Backoffice/User/domain/UserDate";
import { SucursalNotFound } from "../../../../Contexts/Backoffice/Sucursal/domain/SucursalNotFound";
import { DuplicatedUser } from "../../../../Contexts/Backoffice/User/domain/DuplicatedUser";

export class UserCreateController implements Controller {
  
  constructor(
    private userCreator: UserCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id, firstName, lastName, job, phone, email, isAdmin, sucursalId, createdAt, password } = req.body;
    
    try {
      await this.userCreator.run({
        id: new UserId(id),
        firstName: new UserFirstName(firstName),
        lastName: new UserLastName(lastName),
        job: new UserJob(job),
        phone: new UserPhone(phone),
        email: new UserEmail(email),
        isAdmin: new UserIsAdmin(isAdmin),
        sucursalId: new SucursalId(sucursalId),
        createdAt: new UserDate(createdAt),
        password
      });
  
      res.sendStatus(201);
    } catch (error) {
      
      if(error instanceof SucursalNotFound) {
        res.sendStatus(404);
      }

      if(error instanceof DuplicatedUser) {
        res.sendStatus(400);
      }
    }
  }
}
