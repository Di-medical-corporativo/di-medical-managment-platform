import { ItineraryImageGenerator } from "../../../../../Contexts/Backoffice/Itinerary/application/ItineraryImage/ItineraryImageGenerator";
import { Request, Response } from "express";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ImageError } from "../../../../../Contexts/Backoffice/Itinerary/domain/ImageError";

export class ItineraryImageGeneratorController {
  constructor(
    private itineraryImageGenerator: ItineraryImageGenerator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const image = await this.itineraryImageGenerator.run({
        id: new ItineraryId(id)
      });

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="itinerary-${id}.png"`
      });

      res.end(image, 'binary');
    } catch (error) {
      console.log(error);

      if(error instanceof ImageError) {
        res.status(500).render('error/error', {
          message: 'No se pudo generar la imagen, intenta de nuevo'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
