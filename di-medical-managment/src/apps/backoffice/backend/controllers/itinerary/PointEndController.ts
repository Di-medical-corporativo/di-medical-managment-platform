import { PointFinisher } from "../../../../../Contexts/Backoffice/Itinerary/application/FinishPoint/PointFinisher";
import { Request, Response } from "express";
import { PointNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointNotFound";
import { PointProblem } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointProblem";
import { PointComment } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointId } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointId";


export class PointEndController {
  constructor(
    private pointFinisher: PointFinisher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id, comment, problem } = req.body;

      let hasProblem: PointProblem;

      if(problem === 'success') {
        hasProblem = new PointProblem(false);
      } else {
        hasProblem = new PointProblem(true);
      }

      await this.pointFinisher.run({
        comment: new PointComment(comment),
        hasProblem,
        id: new PointId(id)
      });

      res.status(200).render('itinerary/message', {
        message: 'Se ha terminado el punto exitosamente'
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
