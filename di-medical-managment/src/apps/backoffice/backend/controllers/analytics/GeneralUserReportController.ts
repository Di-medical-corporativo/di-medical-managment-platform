import { Request, Response } from "express";
import { UserGeneralReporter } from "../../../../../Contexts/Backoffice/Analytics/application/UserGeneral/UserGeneralReporter";
import { UserNotFound } from "../../../../../Contexts/Backoffice/User/domain/UserNotFound";
import { UserId } from "../../../../../Contexts/Backoffice/User/domain/UserId";
import { FromDate } from "../../../../../Contexts/Backoffice/Analytics/domain/FromDate";
import { ToDate } from "../../../../../Contexts/Backoffice/Analytics/domain/ToDate";

export class GeneralUserReportController {
  constructor(
    private userGeneralReporter: UserGeneralReporter
  ) { }

  async run(req: Request, res: Response) {
    try {
      const { userId, from, to } = req.body;

      const report = await this.userGeneralReporter.run({
        userId: new UserId(userId),
        fromDate: new FromDate(new Date(from)),
        toDate: new ToDate(new Date(to))
      });

      console.log(report.issuesGroupedByDate);

      const justificationFormatedPieChartDat = {
        type: 'doughnut',
        data: {
          labels: [
            'Justificantes en espera de aprobacion',
            'Justificantes rechazados',
            'Justificantes aprobados'
          ],
          datasets: [
            {
              data: [report.justificationPendingCount, report.justificationRejectedCount, report.justificationApprovedCount]
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Distribución de Justificantes por Estatus'
            }
          }
        }
      };

      const typeIssueFormatedPieChart = {
        type: 'pie',
        data: {
          labels: [
            'Faltas',
            'Retardos',
          ],
          datasets: [
            {
              data: [report.absenceTotalCount, report.delayTotalCount]
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Registros Totales de Incidencias de Asistencia'
            }
          }
        }
      };

      const groupedAssitenceIssuesCount = {
        type: 'line',
        data: {
          labels: Object.keys(report.issuesGroupedByDate),
          datasets: [
            {
              label: 'Incidencias de asistencia registradas en el rango',
              data: Object.values(report.issuesGroupedByDate)
            }
          ]
        }
      };

      const permitTypePieFormatted = {
        type: 'pie',
        data: {
          labels: [
            'Permiso de vacaciones',
            'Permiso de enfermedad',
            'Permiso personal'
          ],
          datasets: [
            {
              label: 'Distribución de Permisos por Tipo',
              data: [
                report.vacationPermitCount,
                report.sickPermitCount,
                report.personalPermitCount
              ]
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Distribución de Permisos por Tipo'
            }
          }
        }
      };

      const permitStatusPieFormatted = {
        type: 'doughnut',
        data: {
          labels: [
            'Permisos pendientes de aprobar',
            'Permisos aprobados',
            'Permisos rechazados'
          ],
          datasets: [
            {
              label: 'Distribución de Permisos por Estatus',
              data: [
                report.pendingPermitCount,
                report.approvedPermitCount,
                report.rejectedPermitCount
              ]
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Distribución de Permisos por Estatus'
            }
          }
        }
      }; 

      res.status(200).render('analytics/general-report-user', {
        from,
        to,
        report,
        justificationFormatedPieChartDat,
        typeIssueFormatedPieChart,
        groupedAssitenceIssuesCount,
        permitTypePieFormatted,
        permitStatusPieFormatted
      });
    } catch (error) {
      console.log(error)
      if (error instanceof UserNotFound) {
        res.status(404).render('error/error', {
          message: 'No se encontro el usuario seleccionado'
        });
      } else {
        res.status(500).render('error/error', {
          message: 'Ocurrio un error al general el reporte, contacte soporte'
        });
      }
    }
  }
}
