import { Request, Response } from "express";
import { DepartmentSearcher } from "../../../../../Contexts/Backoffice/Department/application/SearchAll/DepartmentSearcher";
import { Department } from "../../../../../Contexts/Backoffice/Department/domain/Department";

export class DepartmentsFindAllController {
  constructor(
    private departmentSearcher: DepartmentSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const departments: Department[] = await this.departmentSearcher.run();

      res.status(200).render('departments/main', {
        departments: departments.map(d => d.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
