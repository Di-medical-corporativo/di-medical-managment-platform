import { Request, Response } from "express";
import { TagCreator } from "../../../../../Contexts/Backoffice/Products/application/CreateTag/TagCreator";
import { TagId } from "../../../../../Contexts/Backoffice/Products/domain/TagId";
import { TagName } from "../../../../../Contexts/Backoffice/Products/domain/TagName";

export class TagCreateController {
  constructor(
    private tagCreator: TagCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      await this.tagCreator.run({
        id: new TagId(id),
        name: new TagName(name)
      });

      res.redirect('/backoffice/product/tag/')
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      })
    }
  }
}
