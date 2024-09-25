import { ItineraryId } from "./ItineraryId";
import { ItinerarySchedule } from "./ItinerarySchedule";
import { ItinerarySucursal } from "./ItinerarySucursal";
import { Point } from "./Point";

export class ItineraryReport {
  constructor(
    private itineraryId: ItineraryId,
    private sucursal: ItinerarySucursal,
    private scheduleDate: ItinerarySchedule,
    private failedPoints: Point[],
    private succededPoints: Point[],
  ) {}

  static create(params: {
    id: ItineraryId,
    sucursal: ItinerarySucursal,
    scheduleDate: ItinerarySchedule,
    succededPoints: Point[],
    failedPoints: Point[]
  }) {
    return new ItineraryReport(
      params.id,
      params.sucursal,
      params.scheduleDate,
      params.succededPoints,
      params.failedPoints
    );
  }
  
  public toPrimitives() {
    return {
      id: this.itineraryId.toString(),
      sucursal: this.sucursal.toPrimitives(),
      scheduleDate: this.scheduleDate.toString(),
      failedPoints: this.failedPoints.map(fp => fp.toPrimitives()),
      succededPoints: this.succededPoints.map(sp => sp.toPrimitives()),
      totalFailedPoints: this.failedPoints.length,
      totalSuccededPoints: this.succededPoints.length,
      totalPoints: this.succededPoints.length + this.failedPoints.length 
    }
  }
}
