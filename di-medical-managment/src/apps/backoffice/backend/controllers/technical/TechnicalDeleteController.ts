import { Request, Response } from "express";
import { TechnicalDeletor } from "../../../../../Contexts/Backoffice/Technical/application/Delete/TechnicalDeletor";
import { TechnicalNotFound } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalNotFound";
import { TechnicalId } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalId";

export class TechnicalDeleteController {
  constructor(
    private technicalDeletor: TechnicalDeletor
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.technicalDeletor.run({
        id: new TechnicalId(id)
      });
      
      return res.redirect('/backoffice/technical');
    } catch (error) {
      if(error instanceof TechnicalNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la ficha tecnica'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
