import { ItineraryCreator } from "../../../../../Contexts/Backoffice/Itinerary/application/Create/ItineraryCreator";
import { Request, Response } from "express";
import { ItinerarySchedule } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { SucursalId } from "../../../../../Contexts/Backoffice/Sucursal/domain/SucursalId";
import { ClientId } from "../../../../../Contexts/Backoffice/Client/domain/ClientId";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { PointComment } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointComment";
import { ItineraryDate } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryDate";
import { PointObservation } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointObservation";
import { PointCertificate } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { PointSSA } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointType } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointType";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyClosed } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyClosed";

export class ItineraryCreateController {
  constructor(
    private itineraryCreator: ItineraryCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { dueTo, sucursalId, points = [] } = req.body;

      const createdAt = new Date();

      const scheduleDate = new Date(dueTo);
      
      scheduleDate.setDate(scheduleDate.getDate() + 1);

      scheduleDate.setHours(23, 59, 0, 0);

      await this.itineraryCreator.run({
        createdAt: new ItineraryDate(createdAt.toISOString()),
        scheduleDate: new ItinerarySchedule(scheduleDate.toISOString()),
        sucursal: new SucursalId(sucursalId),
        points: points.map((p: any) => {
          const invoices = p.invoice.split(",").map((i: string) => i.trim());

          const observation = p.observation || 'Sin observaciones';
          
          let point = {
            clientId: new ClientId(p.clientId),
            userId: new UserId(p.userId),
            invoices,
            comment: new PointComment('Sin comentario'),
            observation: new PointObservation(observation),
            certificate: new PointCertificate(p.certificate),
            ssa: new PointSSA(p.ssa),
            type: new PointType(p.type),
          }

          if(p.type === 'point-parcel') return point
          else return { ...point, surveyId: new SurveyId(p.surveyId) }
        })
      });

      res.redirect('/backoffice/itinerary');
    } catch (error) {
      console.log(error);

      if(error instanceof SurveyClosed) {
        res.status(400).render('error/error', {
          message: 'Una de las encuestas seleccionadas no acepta mas respuestas'
        });
      }

      res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        }
      );
    }
  }
}
