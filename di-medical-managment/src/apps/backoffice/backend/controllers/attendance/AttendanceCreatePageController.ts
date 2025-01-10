import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export class AttendanceCreatePageController {
  constructor(
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      
      const id = uuid();

      res.status(200).render('attendance/create', {
        id,
        userId
      })
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
