import { PermitCreator } from "../../../../../Contexts/Backoffice/Permit/application/Create/PermitCreator";
import { Request, Response } from "express";
import { InvalidCredentials } from "../../../../../Contexts/Shared/domain/InvalidCredentials";
import { v4 as uuid } from "uuid";
import { PermitDate } from "../../../../../Contexts/Backoffice/Permit/domain/PermitDate";
import { PermitId } from "../../../../../Contexts/Backoffice/Permit/domain/PermitId";
import { PermitReason } from "../../../../../Contexts/Backoffice/Permit/domain/PermitReason";
import { PermitUser } from "../../../../../Contexts/Backoffice/Permit/domain/PermitUser";
import { UserFirstName } from "../../../../../Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../Contexts/Backoffice/User/domain/UserLastName";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  role: string;
}

export class PermitCreateController {
  constructor(
    private permitCreator: PermitCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { type, reason } = req.body;

      const user = req.user as (User | undefined);

      if(!user) throw new InvalidCredentials();

      await this.permitCreator.run({
        createdAt: new PermitDate(new Date().toISOString()),
        id: new PermitId(uuid()),
        reason: new PermitReason(reason),
        type: type,
        user: PermitUser.create({
          firstName: new UserFirstName(user.firstName),
          id: new UserId(user.id),
          lastName: new UserLastName(user.lastName)
        })
      });

      res.redirect('/backoffice');
    } catch (error) {
      console.log(error);

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
