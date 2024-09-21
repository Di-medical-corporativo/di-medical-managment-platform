import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { PointUpdator } from "../../../../../Contexts/Backoffice/Itinerary/application/UpdatePoint/PointUpdator";
import { PointNotFound } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointNotFound";
import { ClientNotFound } from "../../../../../Contexts/Backoffice/Client/domain/ClientNotFound";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { PointCertificate } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { ClientId } from "../../../../../Contexts/Backoffice/Client/domain/ClientId";
import { PointId } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointId";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { PointSSA } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointObservation } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointObservation";
import { Invoice } from "../../../../../Contexts/Backoffice/Itinerary/domain/Invoice";
import { InvoiceId } from "../../../../../Contexts/Backoffice/Itinerary/domain/InvoiceId";
import { InvoiceNumber } from "../../../../../Contexts/Backoffice/Itinerary/domain/InvoiceNumber";

export class UpdatePointController {
  constructor(
    private pointUpdator: PointUpdator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { 
        id, 
        itineraryId, 
        invoices, 
        userAssigned, 
        clientId, 
        certificate, 
        observation,
        ssa
      } = req.body;

      const invoicesDomain = invoices.split(",").map((i: string) => Invoice.create({
        id: new InvoiceId(uuid()),
        number: new InvoiceNumber(i.trim())
      }));

      await this.pointUpdator.run({
        certificate: new PointCertificate(certificate),
        clientId: new ClientId(clientId),
        id: new PointId(id),
        userAssigned: new UserId(userAssigned),
        itineraryId: new ItineraryId(itineraryId),
        ssa: new PointSSA(ssa),
        observation: new PointObservation(observation),
        invoices: invoicesDomain
      });

      res.redirect(`/backoffice/itinerary/${itineraryId}/track`);
    } catch (error) {
      if(error instanceof PointNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el punto'
        });
      }

      if(error instanceof ClientNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el cliente'
        });
      }

      if(error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario'
        });
      }

      res.status(500).render('error/error', {
        message: 'Ocurrio un error contacta soporte'
      });
    }
  }
}
