import { Request, Response } from "express";

export default class DashBoardInitController {
  constructor() {}

  async run(req: Request, res: Response) {
    try {
      const user = req.user;

      console.log(user);

      res.status(200).render('admin', {
        user: user
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
