import { Request, Response } from "express";
import { DepartmentCreator } from "../../../../../Contexts/Backoffice/Department/application/Create/DepartmentCreator";
import { DeparmentId } from "../../../../../Contexts/Backoffice/Department/domain/DeparmentId";
import { DepartmentName } from "../../../../../Contexts/Backoffice/Department/domain/DepartmentName";

export class DepartmentCreateController {
  constructor(
    private departmentCreator: DepartmentCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      await this.departmentCreator.run({
        id: new DeparmentId(id),
        name: new DepartmentName(name)
      });

      res.redirect('/backoffice/department');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
