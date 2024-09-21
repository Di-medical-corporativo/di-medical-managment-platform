import { Request, Response } from "express";
import { ClientSearcher } from "../../../../../Contexts/Backoffice/Client/application/SearchAll/ClientSearcher";
import { UserSearcher } from "../../../../../Contexts/Backoffice/User/application/SearchAll/UserSearcher";
import { PointFinder } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointFinder";
import { PointId } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointId";
import { PointNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointNotFound";
import { ssaStates } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointSSA";
import { certificateStates } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointCertificate";

export class PointUpdateControllerPage {
  constructor(
    private pointFinder: PointFinder,
    private clientSearcher: ClientSearcher,
    private userSearcher: UserSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const clients = await this.clientSearcher.run();

      const users = await this.userSearcher.run();

      const point = await this.pointFinder.run({
        id: new PointId(id)
      });

      res.status(200).render('itinerary/update-point', {
        clients: clients.map(c => c.toPrimitives()),
        users: users.map(s => s.toPrimitives()),
        ssaStates,
        certificateStates,
        point: point.toPrimitives()
      });
    } catch (error) {
      if(error instanceof PointNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el punto'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
