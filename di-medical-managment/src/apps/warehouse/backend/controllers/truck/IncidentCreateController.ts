import { Request, Response } from "express";
import { Controller } from "../../../../../Contexts/Shared/infra/Controller";
import { TruckIncidentAdder } from "../../../../../Contexts/Warehouse/Truck/application/AddIncident/TruckIncidentAdder";
import { IncidentId } from "../../../../../Contexts/Warehouse/Truck/domain/IncidentId";
import { IncidentDescription } from "../../../../../Contexts/Warehouse/Truck/domain/IncidentDescription";
import { IncidentDate } from "../../../../../Contexts/Warehouse/Truck/domain/IncidentDate";
import { TruckId } from "../../../../../Contexts/Warehouse/Truck/domain/TruckId";
import { TruckNotFound } from "../../../../../Contexts/Warehouse/Truck/domain/TruckNotFound";

export class IncidentCreateController implements Controller {
  
  constructor(
    private truckIncidentAdder: TruckIncidentAdder
  ) {}
  
  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, description, startDate, truckId } = req.body;

      await this.truckIncidentAdder.run({
        id: new IncidentId(id),
        description: new IncidentDescription(description),
        startDate: new IncidentDate(startDate),
        truckId: new TruckId(truckId)
      });
  
      res.sendStatus(201); 
    } catch (error) {
      if(error instanceof TruckNotFound) {
        res.sendStatus(404);
      }
    }
  }
}
