import { Request, Response } from "express";
import { TechnicalCreator } from "../../../../../Contexts/Backoffice/Technical/application/Create/TechnicalCreator";
import { MulterRequest } from "../../../../../Contexts/Backoffice/Technical/infra/storage/multerUpload";
import { TechnicalBrandId } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalBrandId";
import { TechnicalCode } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalCode";
import { TechnicalId } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalId";
import { TechnicalName } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalName";
import { TechnicalImage } from "../../../../../Contexts/Backoffice/Technical/domain/TechnicalImage";

export class TechnicalCreateController {
  constructor(
    private technicalCreator: TechnicalCreator
  ) {}

  async run(req: MulterRequest, res: Response) {
    try {
      const { id, name, brand, codes = ''} = req.body;

      const fileName = req.file.filename;

      await this.technicalCreator.run({
        brand: new TechnicalBrandId(brand),
        codes: codes.split(',').map((c: string) => new TechnicalCode(c)),
        id: new TechnicalId(id),
        name: new TechnicalName(name),
        imageUrl: new TechnicalImage('uploads/' + fileName)
      });

      res.redirect('/backoffice/technical');
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
