import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { StatusList } from "../../../Task/domain/TaskStatus";
import { Itinerary } from "../../domain/Itinerary";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryPreview } from "../../domain/ItineraryPreview";
import { ItineraryReport } from "../../domain/ItineraryReport";
import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { CollectPoint, ParcelPoint, Point, RoutePoint } from "../../domain/Point";
import { PointId } from "../../domain/PointId";
import { PointStatusList } from "../../domain/PointStatus";
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
                create: i.invoice.map((i: any) => ({
                  invoceId: i.id,
                  invoiceNumber: i.number
                }))
              }
            }

            if(i.type === PointTypes.Collect || i.type === PointTypes.Route)  {
              let pointDataSurvey = {
                ...pointData,
                survey: {
                  connect: {
                    id: i.survey.id
                  }
                }
              }

              return pointDataSurvey;

            } else { return pointData };
          })
        }
      }
    });
  }

  async findAll(month: number, year: number): Promise<ItineraryPreview[]> {
    const startOfMonth: Date = new Date(year, month - 1, 1);
    
    const endOfMonth: Date = new Date(year, month, 1);
    
    const itineraryDB = await prisma.itinerary.findMany({
      orderBy: {
        scheduleDate: "desc"
      },
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
      },
      where: {
        scheduleDate: {
          gt: startOfMonth,
          lt: endOfMonth
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
          status: i.status,
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

  async end(id: ItineraryId): Promise<void> {
    await prisma.itinerary.update({
      where: {
        id: id.toString()
      },
      data: {
        done: true,
        active: false
      }
    });
  }

  async findPoint(id: PointId): Promise<Point | null> {
    const pointDB = await prisma.point.findUnique({
      where: {
        id: id.toString()
      },
      include: {
        client: {
         select: {
          id: true,
          name: true
         }
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        invoices: true,
        task: {
          select: {
            id: true,
            status: true
          }
        },
        survey:  {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    if(pointDB === null) return null;

    let point: Point;

    let pointData = {
      id: pointDB.id,
      itineraryId: pointDB.itineraryId,
      client: {
        id: pointDB.client.id,
        name: pointDB.client.name
      },
      userAssigned: {
        id: pointDB.user.id,
        firstName: pointDB.user.firstName,
        lastName: pointDB.user.lastName
      },
      invoice: pointDB.invoices.map((invoice) => ({ id: invoice.invoceId, number: invoice.invoiceNumber })),
      comment: pointDB.comment,
      observation: pointDB.observation,
      certificate: pointDB.certificate,
      ssa: pointDB.ssa,
      status: pointDB.status,
      task: {
        id: pointDB.task.id,
        status: pointDB.task.status
      },
      hasProblem: pointDB.problem
    }

    if(pointDB.type === PointTypes.Collect) {
      point = CollectPoint.fromPrimitives({
        ...pointData,
        survey: {
          id: pointDB.survey?.id!,
          title: pointDB.survey?.title! 
        }
      })
    } else if(pointDB.type === PointTypes.Route) {
      point =  RoutePoint.fromPrimitives({
        ...pointData,
        survey: {
          id: pointDB.survey?.id!,
          title: pointDB.survey?.title! 
        }
      });
    } else {
      point = ParcelPoint.fromPrimitives(pointData);
    }

    return point;
  }

  async endPoint(point: Point): Promise<void> {
    const pointPlain = point.toPrimitives();

    const { status, comment } = pointPlain

    let statusPoint;

    if(point.pointWithProblem()) {
      statusPoint = PointStatusList.PointWithProblem;
    } else {
      statusPoint = StatusList.Completed;
    }
    
    await prisma.point.update({
      where: {
        id: pointPlain.id
      },
      data: {
        problem: pointPlain.hasProblem,
        comment,
        task: {
          update: {
            status: StatusList.Completed
          }
        },
        status: statusPoint
      }
    })
  }

  async addPointsToItinerary(id: ItineraryId, points: Point[]): Promise<void> {
    const pointPromises = points.map(point => {
      const i = point.toPrimitives();

      let pointData = {
        id: i.id,
        clientId: i.client.id,
        certificate: i.certificate,
        comment: i.comment,
        observation: i.observation,
        ssa: i.ssa,
        status: i.status,
        taskId: i.task.id,
        type: i.type,
        userId: i.userAssigned.id,
        invoices: {
          create: i.invoice.map((invoice: any) => ({
            invoceId: invoice.id,
            invoiceNumber: invoice.number
          }))
        },
        itineraryId: id.toString(),
        ...(i.survey?.id && { surveyId: i.survey.id })
      }

      return prisma.point.create({
        data: pointData
      });
    });

    const updateStatusForEachPointPromises = points.map(p => {
      const point = p.toPrimitives();

      return prisma.point.update({
        where: {
          id: point.id
        },
        data: {
          status: StatusList.Progress,
          task: {
            update: {
              status: StatusList.Progress
            }
          }
        }
      });
    });

    await Promise.all(pointPromises);

    await Promise.all(updateStatusForEachPointPromises);
  }

  async updatePoint(point: Point): Promise<void> {
    const plainPoint = point.toPrimitives();
    
    await prisma.point.update({
      where: {
        id: plainPoint.id
      },
      data: {
        client: {
          connect: {
            id: plainPoint.client.id
          }
        },
        user: {
          connect: {
            id: plainPoint.userAssigned.id
          }
        },
        task: {
          update: {
            userAssigned: {
              connect: {
                id: plainPoint.userAssigned.id
              }
            }
          }
        },
        observation: plainPoint.observation,
        certificate: plainPoint.certificate,
        ssa: plainPoint.ssa,
        invoices: {
          deleteMany: {
            pointId: plainPoint.id
          },
          create: plainPoint.invoice.map((invoice: any) => ({
            invoceId: invoice.id,
            invoiceNumber: invoice.number
          }))
        }
      }
    });
  }
}
