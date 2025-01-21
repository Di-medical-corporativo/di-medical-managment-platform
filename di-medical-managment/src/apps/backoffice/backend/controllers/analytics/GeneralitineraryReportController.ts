import { Request, Response } from "express";
import { ItineraryGeneralReporter } from "../../../../../Contexts/Backoffice/Analytics/application/ItineraryGeneral/ItineraryGeneralReporter";
import { FromDate } from "../../../../../Contexts/Backoffice/Analytics/domain/FromDate";
import { ToDate } from "../../../../../Contexts/Backoffice/Analytics/domain/ToDate";

export class GeneralitineraryReportController {
  constructor(
    private itineraryGeneralReporter: ItineraryGeneralReporter
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { from, to } = req.body;

      const report = await this.itineraryGeneralReporter.run({
        from: new FromDate(new Date(from)),
        to: new ToDate(new Date(to))
      });

      const pointStatusTypeData = {
        type: 'pie',
        data: {
          labels: [
            'Ruta',
            'Paqueteria',
            'Recoleccion'
          ],
          datasets: [
            {
              data: [report.routePointCount, report.parcelPointCount, report.collectPointCount]
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Distribución de Puntos por Tipo'
            }
          }
        }
      };

      const groupedPointsByDate = {
        type: 'line',
        data: {
          labels: Object.keys(report.aggregatedPointsByDate),
          datasets: [
            {
              label: 'Puntos asignados en el rango',
              data: Object.values(report.aggregatedPointsByDate)
            }
          ]
        }
      };

      res.status(200).render('analytics/general-report-itinerary', {
        from,
        to,
        report,
        pointStatusTypeData,
        groupedPointsByDate
      });

    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
