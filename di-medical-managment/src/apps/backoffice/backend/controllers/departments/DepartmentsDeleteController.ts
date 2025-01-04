import { Request, Response } from "express";
import { DepartmentDeleter } from "../../../../../Contexts/Backoffice/Department/application/Delete/DepartmentDeleter";
import { DepartmentNotFound } from "../../../../../Contexts/Backoffice/Department/domain/DepartmentNotFound";
import { DeparmentId } from "../../../../../Contexts/Backoffice/Department/domain/DeparmentId";

export class DepartmentsDeleteController {
  constructor(
    private departmentDeleter: DepartmentDeleter
  ) { }

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.departmentDeleter.run({
        id: new DeparmentId(id)
      });

      res.redirect('/backoffice/department');
    } catch (error) {
      if (error instanceof DepartmentNotFound) {
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
