import { IncidentDate } from "./IncidentDate";
import { IncidentDescription } from "./IncidentDescription";
import { IncidentId } from "./IncidentId";
import { IncidentIsActive } from "./IncidentIsActive";
import { TruckId } from "./TruckId";

export class Incident {
  constructor(
    private id: IncidentId,
    private description: IncidentDescription,
    private isActive: IncidentIsActive,
    private startDate: IncidentDate,
    private finishDate: IncidentDate,
    private truckId: TruckId
  ) {}

  static create(data: {
    id: IncidentId,
    description: IncidentDescription,
    startDate: IncidentDate,
    truckId: TruckId
  }) {
    return new Incident(
      data.id,
      data.description,
      new IncidentIsActive(true),
      data.startDate,
      data.startDate,
      data.truckId
    );
  }

  static fromPrimitives(data: {
    id: string,
    description: string,
    startDate: string,
    isActive: boolean,
    finishDate: string;
    truckId: string;
  }) {
    return new Incident(
      new IncidentId(data.id),
      new IncidentDescription(data.description),
      new IncidentIsActive(data.isActive),
      new IncidentDate(data.startDate),
      new IncidentDate(data.finishDate),
      new TruckId(data.truckId)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      description: this.description.toString(),
      isActive: this.isActive.value,
      startDate: this.startDate.toString(),
      finishDate: this.finishDate.toString(),
      truckId: this.truckId.toString()
    }
  }
}
