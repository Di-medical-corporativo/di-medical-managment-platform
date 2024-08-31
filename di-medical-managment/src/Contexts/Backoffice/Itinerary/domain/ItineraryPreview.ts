import { ItineraryActive } from "./ItineraryActive";
import { ItineraryDate } from "./ItineraryDate";
import { ItineraryDone } from "./ItineraryDone";
import { ItineraryId } from "./ItineraryId";
import { ItinerarySchedule } from "./ItinerarySchedule";
import { ItinerarySucursal } from "./ItinerarySucursal";
import { ItineraryTotalPoints } from "./ItineraryTotalPoints";

export class ItineraryPreview {
  constructor(
    private id: ItineraryId,
    private scheduleDate: ItineraryDate,
    private createdAt: ItineraryDate,
    private totalPoints: ItineraryTotalPoints,
    private sucursal: ItinerarySucursal,
    private done: ItineraryDone,
    private active: ItineraryActive
  ) {}

  static fromPrimitives(params: {
    id: string;
    sucursal: {
      id: string;
      name: string;
    };
    totalPoints: number;
    createdAt: string;
    done: boolean;
    active: boolean;
    scheduleDate: string;
  }) {
    return new ItineraryPreview(
      new ItineraryId(params.id),
      new ItinerarySchedule(params.scheduleDate),
      new ItineraryDate(params.createdAt),
      new ItineraryTotalPoints(params.totalPoints),
      ItinerarySucursal.fromPrimitives({ 
        id: params.sucursal.id, 
        name: params.sucursal.name 
      }),
      new ItineraryDone(params.done),
      new ItineraryActive(params.active)
    );
  }

  static create(params: {
    id: ItineraryId;
    sucursal: ItinerarySucursal
    totalPoints: ItineraryTotalPoints;
    createdAt: ItineraryDate;
    done: ItineraryDone;
    active: ItineraryActive;
    scheduleDate: ItinerarySchedule;
  }) {
    return new ItineraryPreview(
      params.id,
      params.scheduleDate,
      params.createdAt,
      params.totalPoints,
      params.sucursal,
      params.done,
      params.active,
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      sucursal: this.sucursal.toPrimitives(),
      totalPoints: this.totalPoints.value,
      createdAt: this.createdAt.toString(),
      done: this.done.value,
      scheduleDate: this.scheduleDate.toString(),
      active: this.active.value
    }
  }
}
