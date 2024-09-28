import { ItineraryReporter } from '../../../../../Contexts/Backoffice/Itinerary/application/Report/ItineraryReporter';
import { ItineraryNotFound } from '../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryNotFound';
import { Request, Response } from "express";
import { ItineraryReport } from '../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryReport';
import { ItineraryId } from '../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId';

export class ItineraryReportPageController {
  constructor(
    private itineraryReporter: ItineraryReporter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const report: ItineraryReport = await this.itineraryReporter.run({
        id: new ItineraryId(id)
      });

      res.status(200).render('itinerary/report', {
        report: report.toPrimitives()
      });
    } catch (error) {
     if(error instanceof ItineraryNotFound) {
      res.status(404).render('error/error', {
        message: 'No se encontro el itinerario seleccionado'
      });
     } 

      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
