import { Service } from 'typedi'
import { ItineraryRepository } from '../../application/ItineraryRepository'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { Itinerary } from '../../domain/Itinerary'
import { PrismaClient } from '@prisma/client'
import { ModelTodomainItinerary } from './ModelToDomainItinerary'
import { PaginatedResult } from '../../../shared/domain/PaginatedResult'
import { Point } from '../../domain/Point'
import { ModelToDomainPoint } from './ModelToDomainPoint'

@Service()
export class DbItineraryRepository implements ItineraryRepository {
  private readonly prismaClient = new PrismaClient()

  async updatePointById(point: Point): Promise<Either<ServerError, Point>> {
    try {
      await this.prismaClient.point.update({
        where: {
          id: point.pointId
        },
        data: {
          comment: point.comment,
          done: true,
          problem: true
        }
      })
      return Right.create(point)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async getPointById(pointId: string): Promise<Either<ServerError, Point>> {
    try {
      const point = await this.prismaClient.point.findFirst({
        where: {
          id: pointId
        },
        include: {
          client: true,
          invoices: true,
          survey: true
        }
      })

      if(!point) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const domainPoint = ModelToDomainPoint.fromPoint(point)

      return Right.create(domainPoint)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async getItineraryById(itineraryId: string): Promise<Either<ServerError, Itinerary>> {
    try {
      const itinerary = await this.prismaClient.itinerary.findFirst({
        where: {
          id: itineraryId
        },
        include: {
          points: {
            include: {
              invoices: true,
              truck: true,
              client: true,
              user: true,
              response: {
                include: {
                  answers: {
                    include: {
                      question: {
                        include: {
                          type: true
                        }
                      },
                      answerOption: {
                        include: {
                          option: true
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          sucursal: true,
        }
      })

      if(!itinerary) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const domainItinerary = ModelTodomainItinerary.from(itinerary)

      return Right.create(domainItinerary)

    } catch (error) {
      console.log(error)
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  private pageSize: number = 10
  public async getItineraryPaginated(page: number): Promise<Either<ServerError, PaginatedResult<Itinerary>>> {
    try {
      const [ itineraries, total ] = await Promise.all([
        this.prismaClient.itinerary.findMany({
          skip: (page - 1) * 10,
          take: this.pageSize,
          include: {
            _count: true
          },
          orderBy: {
            scheduleDate: 'desc'
          }
        }),
        this.prismaClient.itinerary.count()
      ])
    
      const totalPages = Math.ceil(total / this.pageSize)

      if(page > totalPages) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const itinerariesDomain = ModelTodomainItinerary.fromItineraries(itineraries)
      const pagination = new PaginatedResult<Itinerary>(
        itinerariesDomain,
        totalPages
      )
      return Right.create(pagination)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }      
  }

  public async createItinerary(itinerary: Itinerary): Promise<Either<ServerError, Itinerary>> {
    try {
      const itineraryCreated = await this.prismaClient.itinerary.create({
        data: {
          sucursal: {
            connect: {
              id: itinerary.sucursal.sucursalId
            }
          },
          scheduleDate: itinerary.scheduleDate,
          points: {
            create: itinerary.points.map(point => {
              const pointToCreate: any = { 
                client: {
                  connect: {
                    id: point.client.clientId
                  } 
                },
                truck: {
                  connect: {
                    id: point.truck.truckId
                  }
                },
                user: {
                  connect: {
                    id: point.assignedDriver.userId
                  },
                },
                invoices: {
                  create: point.invoices.map(invoice => {
                    return { invoiceNumber: invoice.invoiceNumber, description: invoice.description}
                  })
                },
                done: false,
              }

              if(point.survey) {
                pointToCreate.survey = {
                  connect: {
                    id: point.survey.surveyId
                  }
                }
              }

              return pointToCreate
            }),
          },
          createdAt: itinerary.createdAt,
          updatedAt: itinerary.updatedAt,
          active: true
        },
        include: {
          points: {
            include: {
              invoices: true,
              truck: true,
              client: true,
              user: true,
              survey: {
                include: {
                  questions: {
                    include: {
                      options: true,
                      type: true
                    }
                  }
                }
              }
            }
          },
          sucursal: true,
        }
      })

      const itineraryDomain = ModelTodomainItinerary.from(itineraryCreated)
      return Right.create(itineraryDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }    
  }
}
