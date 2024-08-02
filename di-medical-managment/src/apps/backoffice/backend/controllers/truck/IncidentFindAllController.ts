import { Request, Response } from "express";
import { IncidentSearcher } from "../../../../../Contexts/Backoffice/Truck/application/SearchAllIncident/IncidentSearcher";
import { TruckId } from "../../../../../Contexts/Backoffice/Truck/domain/TruckId";

export class IncidentFindAllController {
  constructor(
    private incidentSearcher: IncidentSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { truckId } = req.params;

      const incidents = await this.incidentSearcher.run({ truckId: new TruckId(truckId)  });

      res.status(200).render('trucks/incidents', {
        incidents: incidents.map(i => i.toPrimitives()),
        truckId
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
