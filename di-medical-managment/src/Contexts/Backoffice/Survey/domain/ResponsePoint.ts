import { Invoice } from "../../Itinerary/domain/Invoice";
import { ItinerarySchedule } from "../../Itinerary/domain/ItinerarySchedule";
import { PointId } from "../../Itinerary/domain/PointId";
import { PointUser } from "../../Itinerary/domain/PointUser";

export class ResponsePoint {
  constructor(
    private id: PointId,
    public itinerarySchedule: ItinerarySchedule,
    private invoices: Invoice[],
    private userAssigned: PointUser
  ) {}

  static create(params: {
    id: PointId;
    itinerarySchedule: ItinerarySchedule;
    invoices: Invoice[];
    userAssigned: PointUser;
  }): ResponsePoint {
    return new ResponsePoint(
      params.id,
      params.itinerarySchedule,
      params.invoices,
      params.userAssigned
    );
  }

  static fromPrimitives(params: {
    id: string;
    itinerarySchedule: string;
    invoices: { id: string; number: string }[];
    userAssigned: { id: string; firstName: string; lastName: string };
  }): ResponsePoint {
    return new ResponsePoint(
      new PointId(params.id),
      new ItinerarySchedule(params.itinerarySchedule),
      params.invoices.map((invoice) => Invoice.fromPrimitives(invoice)),
      PointUser.fromPrimitives(params.userAssigned)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      itinerarySchedule: this.itinerarySchedule.toString(),
      invoices: this.invoices.map((invoice) => invoice.toPrimitives()),
      userAssigned: this.userAssigned.toPrimitives()
    };
  }
}
