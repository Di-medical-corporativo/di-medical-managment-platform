import { Request, Response } from "express";
import { JustificationFinder } from "../../../../../Contexts/Backoffice/Attendance/application/FindJustification/JustificationFinder";
import { JustificationNotFound } from "../../../../../Contexts/Backoffice/Attendance/domain/JustificationNotFound";
import { Justification } from "../../../../../Contexts/Backoffice/Attendance/domain/Justification";
import { JustificationId } from "../../../../../Contexts/Backoffice/Attendance/domain/JustificationId";

export class AttendanceJustificationFindController {
  constructor(
    private justificationFinder: JustificationFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { justificationId } = req.params;

      const justification: Justification = await this.justificationFinder.run({
        justificationId: new JustificationId(justificationId)
      });

      res.status(200).render('attendance/detail', {
        justification: justification.toPrimitives()
      })
    } catch (error) {
      if(error instanceof JustificationNotFound) {
        res.status(404).render('error/error',{
          message: 'No se encontro el justificante'
        });
      } else {
        res.status(500).render('error/error',{
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
