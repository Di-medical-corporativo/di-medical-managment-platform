import { ItineraryActive } from "./ItineraryActive";
import { ItineraryDate } from "./ItineraryDate";
import { ItineraryDone } from "./ItineraryDone";
import { ItineraryId } from "./ItineraryId";
import { ItinerarySchedule } from "./ItinerarySchedule";
import { ItinerarySucursal } from "./ItinerarySucursal";
import { CollectPoint, ParcelPoint, Point, RoutePoint } from "./Point";
import { PointTypes } from "./PointType";

export class Itinerary {
  constructor(
    private id: ItineraryId,
    private sucursal: ItinerarySucursal,
    private points: Point[],
    private createdAt: ItineraryDate,
    private updatedAt: ItineraryDate,
    private done: ItineraryDone,
    private scheduleDate: ItinerarySchedule,
    private active: ItineraryActive
  ) {}

  static create(params:{
    id: ItineraryId,
    sucursal: ItinerarySucursal,
    points: Point[],
    createdAt: ItineraryDate,
    scheduleDate: ItinerarySchedule
  }) {
    return new Itinerary(
      params.id,
      params.sucursal,
      params.points,
      params.createdAt,
      params.createdAt,
      new ItineraryDone(false),
      params.scheduleDate,
      new ItineraryActive(false)
    );
  }

  static fromPrimitives(params: {
    id: string;
    sucursal: {
      id: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
    done: boolean;
    active: boolean;
    scheduleDate: string;
    points: {
      id: string;
      itineraryId: string;
      client: {
        id: string;
        name: string
      };
      userAssigned: {
        id: string;
        firstName: string;
        lastName: string;
      };
      invoice: {
        id: string;
        number: string
      }[];
      comment: string;
      observation: string;
      certificate: string;
      ssa: string;
      status: string;
      task: {
        id: string;
        status: string;
      };
      hasProblem: boolean;
      survey: {
        id: string;
        title: string;
      } | undefined
      type: string;
    }[];
  }) {
    const points: Point[] = params.points.map(point => {
      if(point.type === PointTypes.Collect) {
        return CollectPoint.fromPrimitives({
          id: point.id,
          certificate: point.certificate,
          client: point.client,
          comment: point.comment,
          hasProblem: point.hasProblem,
          invoice: point.invoice,
          itineraryId: point.itineraryId,
          observation: point.observation,
          ssa: point.ssa,
          status: point.status,
          task: point.task,
          survey: point.survey!,
          userAssigned: point.userAssigned
        });
      } else if(point.type === PointTypes.Parcel) {
        return ParcelPoint.fromPrimitives({
          id: point.id,
          certificate: point.certificate,
          client: point.client,
          comment: point.comment,
          hasProblem: point.hasProblem,
          invoice: point.invoice,
          itineraryId: point.itineraryId,
          observation: point.observation,
          ssa: point.ssa,
          status: point.status,
          task: point.task,
          userAssigned: point.userAssigned
        });
      } else {
        return RoutePoint.fromPrimitives({
          id: point.id,
          certificate: point.certificate,
          client: point.client,
          comment: point.comment,
          hasProblem: point.hasProblem,
          invoice: point.invoice,
          itineraryId: point.itineraryId,
          observation: point.observation,
          ssa: point.ssa,
          status: point.status,
          task: point.task,
          userAssigned: point.userAssigned,
          survey: point.survey!
        });
      }
    });

    return new Itinerary(
      new ItineraryId(params.id),
      ItinerarySucursal.fromPrimitives(params.sucursal),
      points,
      new ItineraryDate(params.createdAt),
      new ItineraryDate(params.updatedAt),
      new ItineraryDone(params.done),
      new ItinerarySchedule(params.scheduleDate),
      new ItineraryActive(params.active)
    );
  }

  public hasOnGoingPoints() {
    const find = this.points.find(p => !p.isFinished());

    if(find === undefined) return false;
    return true;
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      sucursal: this.sucursal.toPrimitives(),
      points: this.points.map(p => p.toPrimitives()),
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
      done: this.done.value,
      scheduleDate: this.scheduleDate.toString(),
      active: this.active.value
    }
  }
}
