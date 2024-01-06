import { ModelToClientDomain } from "../../../shared/infra/prisma/ModelToClientDomain";
import { ModelToUserDomain } from "../../../shared/infra/prisma/ModelToUserDomain";
import { ModelToDomainSurvey } from "../../../survey/infra/prisma/ModelToDomainSurvey";
import { Point as DomainPoint } from "../../domain/Point";
import { ModelToDomainInvoice } from "./ModelToDomainInvoice";
import { ModelToDomainTruck } from "./ModelToDomainTruck";

export class ModelToDomainPoint {
  public static fromPoints(points: any) {
    const domainPoints = points.map((point: any) => {
      const pointDomain = new DomainPoint(
        point.id
      )
      pointDomain.assignedDriver = ModelToUserDomain.from(point.user)
      pointDomain.client = ModelToClientDomain.from(point.client)
      pointDomain.assignedDriver = ModelToUserDomain.from(point.user)
      pointDomain.invoices = ModelToDomainInvoice.fromInvoices(point.invoices)
      pointDomain.truck = ModelToDomainTruck.from(point.truck)

      if(point.comment) {
        pointDomain.comment = point.comment
      }
      
      if(point.survey != null) {
        pointDomain.survey = ModelToDomainSurvey.from(point.survey)
      }
    
      return pointDomain
    })

    return domainPoints
  }

  public static fromPointsClient(points: { 
    id: string; 
    sign: string | null; 
    clientId: string; 
    truckId: string; 
    userId: string; 
    itineraryId: string | null; 
  }) {

  }
}
