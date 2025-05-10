import { Request, Response } from "express";
import { TagSearcher } from "../../../../../Contexts/Backoffice/Products/application/SearchAllTags/TagSearcher";
import { Tag } from "../../../../../Contexts/Backoffice/Products/domain/Tag";

export class TagsFindAllController {
  constructor(
    private tagSearcher: TagSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const tags: Tag[] = await this.tagSearcher.run();

      res.status(200).render('products/tags', {
        tags: tags.map(t => t.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
