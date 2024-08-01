import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { TruckIncidentAdder } from "../../../../../Contexts/Backoffice/Truck/application/AddIncident/TruckIncidentAdder";
import { IncidentId } from "../../../../../Contexts/Backoffice/Truck/domain/IncidentId";
import { IncidentDescription } from "../../../../../Contexts/Backoffice/Truck/domain/IncidentDescription";
import { IncidentDate } from "../../../../../Contexts/Backoffice/Truck/domain/IncidentDate";
import { TruckId } from "../../../../../Contexts/Backoffice/Truck/domain/TruckId";
import { TruckNotFound } from "../../../../../Contexts/Backoffice/Truck/domain/TruckNotFound";

export class IncidentCreateController implements Controller {
  
  constructor(
    private truckIncidentAdder: TruckIncidentAdder
  ) {}
  
  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, description } = req.body;
      const { truckId } = req.params;

      await this.truckIncidentAdder.run({
        id: new IncidentId(id),
        description: new IncidentDescription(description),
        startDate: new IncidentDate(new Date().toISOString()),
        truckId: new TruckId(truckId)
      });
  
      res.redirect(`/backoffice/truck/${truckId}/incidents`); 
    } catch (error) {
      if(error instanceof TruckNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro la camioneta'
        });
      }
    }
  }
}
