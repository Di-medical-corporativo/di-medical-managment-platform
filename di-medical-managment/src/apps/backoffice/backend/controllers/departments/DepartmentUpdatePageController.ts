import { Request, Response } from "express";
import { DepartmentFinder } from "../../../../../Contexts/Backoffice/Department/domain/DepartmentFinder";
import { DepartmentNotFound } from "../../../../../Contexts/Backoffice/Department/domain/DepartmentNotFound";
import { Department } from "../../../../../Contexts/Backoffice/Department/domain/Department";
import { DeparmentId } from "../../../../../Contexts/Backoffice/Department/domain/DeparmentId";

export class DepartmentUpdatePageController {
  constructor(
    private departmentFinder: DepartmentFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const department: Department = await this.departmentFinder.run({
        id: new DeparmentId(id)
      });

      res.status(200).render('departments/update', {
        department: department.toPrimitives()
      });
    } catch (error) {
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
