import { PointAdder } from "../../../../../Contexts/Backoffice/Itinerary/application/AddPoint/PointAdder";
import { Request, Response } from "express";
import { SurveyClosed } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyClosed";
import { ItinerarySchedule } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ClientId } from "../../../../../Contexts/Backoffice/Client/domain/ClientId";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { PointComment } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointObservation } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointObservation";
import { PointCertificate } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { PointSSA } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointType } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointType";
import { SurveyId } from "../../../../../Contexts/Backoffice/Survey/domain/SurveyId";

export class ItineraryAddPointsController {
  constructor(
    private pointAdder: PointAdder
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { scheduleDate: scheduleDateV, id, points = [] } = req.body;

        const scheduleDate = new Date(scheduleDateV);
      
      scheduleDate.setDate(scheduleDate.getDate() + 1);

      scheduleDate.setHours(23, 59, 0, 0);

      await this.pointAdder.run({
        itineraryId: new ItineraryId(id),
        scheduleDate: new ItinerarySchedule(scheduleDate.toISOString()),
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

          if(p.type === 'point-parcel') return point;
          else return { ...point, surveyId: new SurveyId(p.surveyId) }
        })
      });

      res.redirect(`/backoffice/itinerary/${id}/track`);
    } catch (error) {
      if(error instanceof SurveyClosed) {
        res.status(400).render('error/error', {
          message: 'Una de las encuestas seleccionadas no acepta mas respuestas'
        });
      }

      console.log(error);

      res.status(500).render('error/error', {
          message: 'Ocurrio un error, contacta soporte'
        }
      );
    }
  }
}
