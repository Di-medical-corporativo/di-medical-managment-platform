import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { StatusList } from "../../../Task/domain/TaskStatus";
import { Itinerary } from "../../domain/Itinerary";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryPreview } from "../../domain/ItineraryPreview";
import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { ItinerarySucursal } from "../../domain/ItinerarySucursal";
import { PointTypes } from "../../domain/PointType";

export class PrismaItineraryRepository implements ItineraryRepository {
  async save(itinerary: Itinerary): Promise<void> {
    const itineraryPlain = itinerary.toPrimitives();

    console.log(itineraryPlain);

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
                create: i.invoice.map((i: any) => ({
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

  async findAll(): Promise<ItineraryPreview[]> {
    const itineraryDB = await prisma.itinerary.findMany({
      include: {
        _count: {
          select: {
            points: true
          }
        },
        sucursal: {
          select: {
            id: true,
            name: true
          }
        }
      } 
    });

    const itineraries = itineraryDB.map(i => ItineraryPreview.fromPrimitives({
      active: i.active,
      createdAt: i.createdAt.toISOString(),
      done: i.done,
      id: i.id,
      scheduleDate: i.scheduleDate.toISOString(),
      sucursal: {
        id: i.sucursal.id,
        name: i.sucursal.name
      },
      totalPoints: i._count.points
    }));

    return itineraries;
  }

  async search(id: ItineraryId): Promise<Itinerary | null> {
    const itineraryDB = await prisma.itinerary.findUnique({
      where: {
        id: id.toString()
      },
      include: {
        sucursal: {
          select: {
            id: true,
            name: true
          }
        },
        points: {
          include: {
            client: {
              select: {
                id: true,
                name: true
              }
            },
            invoices: true,
            survey: {
              select: {
                id: true,
                title: true
              }
            },
            task: {
              select: {
                id: true,
                status: true
              }
            },
            user: {
              select: {
                firstName: true,
                lastName: true,
                id: true
              }
            }
          }
        }
      }
    });

    if(itineraryDB === null) return null;

    const itinerary = Itinerary.fromPrimitives({
      active: itineraryDB.active,
      done: itineraryDB.done,
      createdAt: itineraryDB.createdAt.toISOString(),
      id: itineraryDB.id,
      scheduleDate: itineraryDB.scheduleDate.toISOString(),
      sucursal: {
        id: itineraryDB.sucursal.id,
        name: itineraryDB.sucursal.name
      },
      updatedAt: itineraryDB.updatedAt.toISOString(),
      points: itineraryDB.points.map((i) => {
        let survey = undefined;

        if(i.type !== PointTypes.Parcel) {
          survey = {
            id: i.survey?.id!,
            title: i.survey?.title!
          }
        }

        return {
          certificate: i.certificate,
          client: {
            id: i.client.id,
            name: i.client.name,
          },
          comment: i.comment,
          hasProblem: i.problem,
          id: i.id,
          invoice: i.invoices.map(invoice => ({ id: invoice.invoceId, number: invoice.invoiceNumber })),
          itineraryId: i.itineraryId,
          observation: i.observation,
          ssa: i.ssa,
          status: i.task.status,
          survey,
          task: {
            id: i.task.id,
            status: i.task.status
          },
          type: i.type,
          userAssigned: {
            firstName: i.user.firstName,
            lastName: i.user.lastName,
            id: i.user.id
          }
        }
      })
    });

    return itinerary;
  }

  async start(id: ItineraryId): Promise<void> {
    await prisma.itinerary.update({
      where: {
        id: id.toString()
      },
      data: {
        active: true
      }
    });

    await prisma.point.updateMany({
      where: {
        itineraryId: id.toString()
      },
      data: {
        status: StatusList.Progress
      }
    });

    await prisma.task.updateMany({
      where: {
        point: {
          itineraryId: id.toString()
        }
      },
      data: {
        status: StatusList.Progress
      }
    })
  }
}
