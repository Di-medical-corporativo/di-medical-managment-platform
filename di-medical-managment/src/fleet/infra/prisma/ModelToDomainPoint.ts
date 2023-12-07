import { ModelToClientDomain } from "../../../shared/infra/prisma/ModelToClientDomain";
import { ModelToUserDomain } from "../../../shared/infra/prisma/ModelToUserDomain";
import { Point as DomainPoint } from "../../domain/Point";
import { ModelToDomainInvoice } from "./ModelToDomainInvoice";
import { ModelToDomainTruck } from "./ModelToDomainTruck";

export class ModelToDomainPoint {
  public static fromPoints(points: (
    { 
      user: 
      { 
        id: string; 
        firstName: string; 
        lastName: string; 
        birthDate: Date; 
        NSS: string; 
        job: string; 
        picture: string; 
        phone: string; 
        email: string; 
        isActive: boolean; 
        createdAt: Date; 
        updatedAt: Date; 
        loginId: string | null; 
        sucursalId: string; 
      }; 
      client: 
      { 
        id: string; 
        name: string; 
        address: string; 
        isActive: boolean; 
      }; 
      truck: 
      { 
        id: string; 
        plates: string; 
        model: string; 
        brand: string; 
        picture: string; 
        isActive: boolean; 
      }; 
      invoices: 
      { 
        invoceId: string; 
        invoiceNumber: string; 
        description: string; 
        pointId: string; 
      }[]; 
      }
       & 
       { 
        id: string; 
        sign: string | null; 
        clientId: string; 
        truckId: string; 
        userId: string; 
        itineraryId: string | null; 
      })[]) {

    const domainPoints = points.map((point) => {
      const pointDomain = new DomainPoint(
        point.id
      )
      pointDomain.assignedDriver = ModelToUserDomain.from(point.user)
      pointDomain.client = ModelToClientDomain.from(point.client)
      pointDomain.assignedDriver = ModelToUserDomain.from(point.user)
      pointDomain.invoices = ModelToDomainInvoice.fromInvoices(point.invoices)
      pointDomain.truck = ModelToDomainTruck.from(point.truck)
      return pointDomain
    })

    return domainPoints
  }
}
