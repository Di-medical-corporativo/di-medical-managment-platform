import { Service } from 'typedi'
import { ItineraryRepository } from '../../application/ItineraryRepository';
import { Either, Left, Right } from '../../../shared/domain/Either';
import { ServerError } from '../../../shared/domain/errors/Error';
import { Itinerary } from '../../domain/Itinerary';
import { PrismaClient } from '@prisma/client';
import { ModelTodomainItinerary } from './ModelToDomainItinerary';

@Service()
export class DbItineraryRepository implements ItineraryRepository {
  private readonly prismaClient = new PrismaClient()
  async createItinerary(itinerary: Itinerary): Promise<Either<ServerError, Itinerary>> {
    try {
      const itineraryCreated = await this.prismaClient.itinerary.create({
        data: {
          sucursal: {
            connect: {
              id: itinerary.sucursal.sucursalId
            }
          },
          points: {
            create: itinerary.points.map(point => ({ 
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
                  return { invoiceNumber: invoice.invoiceNumber, description: invoice.description }
                })
              }
            })),
          },
          createdAt: itinerary.createdAt,
          updatedAt: itinerary.updatedAt
        },
        include: {
          points: {
            include: {
              invoices: true,
              truck: true,
              client: true,
              user: true
            }
          },
          sucursal: true,
        }
      })
      const domainItinerary = ModelTodomainItinerary.from(itineraryCreated)
      
      return Right.create(domainItinerary)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }    
  }
}
