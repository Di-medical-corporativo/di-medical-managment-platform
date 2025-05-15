import { Request, Response } from "express";
import { TagDeletor } from "../../../../../Contexts/Backoffice/Products/application/DeleteTag/TagDeletor";
import { TagNotFound } from "../../../../../Contexts/Backoffice/Products/domain/TagNotFound";
import { TagId } from "../../../../../Contexts/Backoffice/Products/domain/TagId";

export class TagDeleteController {
  constructor(
    private tagDeleter: TagDeletor
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      await this.tagDeleter.run({
        id: new TagId(id)
      });

      res.redirect('/backoffice/product/tag/');
    } catch (error) {
      if(error instanceof TagNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el tag'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        });
      }
    }
  }
}
