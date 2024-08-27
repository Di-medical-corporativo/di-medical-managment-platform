import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Itinerary } from "../../domain/Itinerary";
import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { PointTypes } from "../../domain/PointType";

export class PrismaItineraryRepository implements ItineraryRepository {
  async save(itinerary: Itinerary): Promise<void> {
    const itineraryPlain = itinerary.toPrimitives();
    
    await prisma.itinerary.create({
      data: {
        id: itineraryPlain.id,
        active: itineraryPlain.active,
        createdAt: itineraryPlain.createdAt,
        scheduleDate: itineraryPlain.scheduleDate,
        updatedAt: itineraryPlain.updatedAt,
        sucursal: {
          connect: {
            id: itineraryPlain.sucursal.id
          }
        },
        points: {
          create: itineraryPlain.points.map(i => {
            let pointData = {
              id: i.id,
              client: {
                connect: {
                  id: i.client.id
                }
              },
              certificate: i.certificate,
              comment: i.comment,
              observation: i.observation,
              ssa: i.ssa,
              status: i.status,
              task: {
                connect: {
                  id: i.task.id
                }
              },
              type: i.type,
              user: {
                connect: {
                  id: i.userAssigned.id
                }
              },
              invoices: {
                create: i.invoce.map((i: any) => ({
                  invoceId: i.id,
                  invoiceNumber: i.number
                }))
              }
            }

            let pointDataSurvey = {
              ...pointData,
              survey: {
                connect: {
                  id: i.survey.id
                }
              }
            }

            if(i.type === PointTypes.Collect || i.type === PointTypes.Route) return pointDataSurvey
            else return pointData;
          })
        }
      }
    });
  }
}
