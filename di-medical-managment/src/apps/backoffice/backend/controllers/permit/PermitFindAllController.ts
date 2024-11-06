import { PermitSearcher } from "../../../../../Contexts/Backoffice/Permit/application/SearchAll/PermitSearcher";
import { Request, Response } from "express";
import { InvalidCredentials } from "../../../../../Contexts/Shared/domain/InvalidCredentials";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  role: string;
}

export class PermitFindAllController {
  constructor(
    private permitSearcher: PermitSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { filter } = req.query as { filter?: string } as { filter?: string };; 

      let dateToFilter = new Date();

      let monthToFilter: number = dateToFilter.getMonth() + 1;

      let yearToFilter: number = dateToFilter.getFullYear();  

      if(filter) {
        const [year, monthNumber] = filter.split('-');
        
        yearToFilter = parseInt(year, 10);

        monthToFilter = parseInt(monthNumber, 10);
      }

      const { approved, pending, rejected } = await this.permitSearcher.run({
        month: monthToFilter,
        year: yearToFilter
      });

      res.status(200).render('permit/main', {
        approvedPermits: approved.map(p => p.toPrimitives()),
        pendingPermits: pending.map(p => p.toPrimitives()),
        rejectedPermits: rejected.map(p => p.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error contacta soporte'
      })
    }
  }
}
