import { Request, Response } from "express";
import { DepartmentUpdator } from "../../../../../Contexts/Backoffice/Department/application/Update/DepartmentUpdator";
import { DepartmentNotFound } from "../../../../../Contexts/Backoffice/Department/domain/DepartmentNotFound";
import { DeparmentId } from "../../../../../Contexts/Backoffice/Department/domain/DeparmentId";
import { DepartmentName } from "../../../../../Contexts/Backoffice/Department/domain/DepartmentName";

export class DepartmentsUpdateController {
  constructor(
    private departmentUpdator: DepartmentUpdator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      await this.departmentUpdator.run({
        id: new DeparmentId(id),
        name: new DepartmentName(name)
      });

      res.redirect('/backoffice/department')
    } catch (error) {
      console.log(error);
      if(error instanceof DepartmentNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el departamento'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
