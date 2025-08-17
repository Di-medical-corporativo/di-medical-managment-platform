import { Request, Response } from "express";
import { TechnicalSearcher } from "../../../../../Contexts/Backoffice/Technical/application/SearchAll/TechnicalSearcher";
import { Technical } from "../../../../../Contexts/Backoffice/Technical/domain/Technical";

export class TechnicalFindAllController {
  constructor(
    private technicalSearcher: TechnicalSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { term = '', page = 1 } = req.query;

      const pageNumber = Number(page) || 1

      const stringTerm = String(term || '').trim();

      const { technical, totalPages } = await this.technicalSearcher.run({
        page: pageNumber,
        term: stringTerm
      });

      res.status(200).render('technical/main', {
        techincal: technical.map(t => t.toPrimitives()),
        totalPage: totalPages,
        pageNumber,
        term
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
