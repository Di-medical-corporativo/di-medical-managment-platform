import { TruckIncidentRemover } from "../../../../../Contexts/Backoffice/Truck/application/RemoveIncident/TruckIncidentRemover";
import { IncidentDate } from "../../../../../Contexts/Backoffice/Truck/domain/IncidentDate";
import { IncidentId } from "../../../../../Contexts/Backoffice/Truck/domain/IncidentId";
import { Request, Response } from "express";
import { IncidentNotFound } from "../../../../../Contexts/Backoffice/Truck/domain/IncidentNotFound";

export class IncidentRemoveController {
  constructor(
    private incidentRemover: TruckIncidentRemover
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const { truckId } = req.params;

      await this.incidentRemover.run({
        id: new IncidentId(id),
        finishDate: new IncidentDate(new Date().toISOString())
      });

      res.redirect(`/backoffice/truck/${truckId}/incidents`);
    } catch (error) {
      if(error instanceof IncidentNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el incidente'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
