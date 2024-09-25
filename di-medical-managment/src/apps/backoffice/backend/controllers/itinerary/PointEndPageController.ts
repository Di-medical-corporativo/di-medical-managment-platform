import { Request, Response } from "express";
import { PointNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointNotFound";
import { PointFinder } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointFinder";
import { PointId } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointId";

export class PointEndPageController {
  constructor(
    private pointFinder: PointFinder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const point = await this.pointFinder.run({
        id: new PointId(id)
      });

      res.status(200).render('itinerary/point-end', {
        point: point.toPrimitives()
      });
    } catch (error) {
      if(error instanceof PointNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el punto seleccionado'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}