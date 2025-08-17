import { Request, Response } from "express";
import { TechnicalSearcher } from "../../../../../../Contexts/Backoffice/Technical/application/SearchAll/TechnicalSearcher";

export class TechnicalFindPaginated {
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

      res.status(200).json({
        techincal: technical.map(t => t.toPrimitives()),
        totalPage: totalPages,
        pageNumber,
        term
      });
    } catch (error) {
      res.status(500).json({
        error: 'Something went wrong, try again later'
      });
    }
  }
}
