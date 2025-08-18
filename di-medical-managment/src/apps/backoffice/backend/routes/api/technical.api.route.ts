import { Express, Request, Response } from "express";
import container from "../../dependency-injection";
import { TechnicalFindPaginated } from "../../controllers/technical/api/TechnicalFindPaginated";
import path from "path";
import fs from "fs";
const UPLOADS_PATH = process.env.UPLOADS_PATH || "uploads";

export const register = (app: Express) => {
  const technicalFindPaginated: TechnicalFindPaginated = container
  .get('Apps.Backoffice.backend.controllers.api.TechnicalFindPaginated');

  app.get('/technical', (req: Request, res: Response) => technicalFindPaginated.run(req, res));

  app.get('/download/:filename', (req: Request, res: Response) => {
    const { filename } = req.params;

    const filePath = path.join(UPLOADS_PATH, filename);

    if(!fs.existsSync(filePath)) {
      res.status(404).json({
        error: "No se encontro el archivo"
      });
    } else {
      res.download(filePath);
    }

  });
}
