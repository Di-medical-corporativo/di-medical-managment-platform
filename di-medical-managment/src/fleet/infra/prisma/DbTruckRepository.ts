import { PrismaClient } from '@prisma/client';
import { Either, Left, Right } from '../../../shared/domain/Either';
import { BaseError, ServerError } from '../../../shared/domain/errors/Error';
import { TruckRespository } from '../../application/TruckRepository';
import { Truck } from '../../domain/Truck';
import { Service } from 'typedi';
import { Incident } from '../../domain/Incident';
import { ModelToDomainIncidents } from './ModelToDomainIncident';

@Service()
export class DbTruckRepository implements TruckRespository {
  private readonly prismaClient = new PrismaClient()
  async createTruck(truck: Truck): Promise<Either<ServerError, Truck>> {
    try {
      const truckCreated = await this.prismaClient.truck.create({
        data: {
          brand: truck.brand,
          model: truck.model,
          picture: truck.picture,
          plates: truck.plates,
          isActive: true
        }
      })

      truck.truckId = truckCreated.id
      truck.isActive = truckCreated.isActive
      return Right.create(truck)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async getTruckById (truckId: string): Promise<Either<ServerError, Truck>> {
    try {
      const truckById = await this.prismaClient.truck.findFirst({
        where: {
          id: truckId
        },
        include: {
          incidents:true
        }
      })

      if(!truckById){
        return Left.create(ServerError.NOT_FOUND)
      }
      
      const incidents = ModelToDomainIncidents.from(truckById.incidents)
      const truck = new Truck(
        truckById.id,
        truckById.plates,
        truckById.model,
        truckById.brand,
        truckById.picture,
        truckById.isActive
      )

      truck.incidents = incidents
      truck.isActive = truckById.isActive
      return Right.create(truck)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async addIncident(truck: Truck, incident: Incident): Promise<Either<ServerError, Truck>> {
    try {
      await this.prismaClient.incident.create({
        data: {
          description: incident.description,
          picture: incident.picture,
          isActive: true,
          startDate: incident.startDate,
          finishedDate: incident.finishDate,
          truck: {
            connect: {
              id: truck.truckId
            }
          }
        }
      })

      truck.incidents.push(incident)
      return Right.create(truck)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async getIncidentById(incidentId: string): Promise<Either<ServerError, Incident>> {
    try {
      const incidentById = await this.prismaClient.incident.findFirst({
        where: {
          id: incidentId
        }
      })

      if(!incidentId) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const incident: Incident = ModelToDomainIncidents.fromSingle(incidentById!)

      return Right.create(incident)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async removeIncident(truck: Truck, incident: Incident): Promise<Either<ServerError, Truck>> {
    try {
      await this.prismaClient.incident.update({
        where: {
          id: incident.incidentId
        },
        data: {
          isActive: false
        }
      })
      truck.removeIncident(incident)
      return Right.create(truck)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async updateTruck(truck: Truck): Promise<Either<ServerError, Truck>> {
    try {
      await this.prismaClient.truck.update({
        where: {
          id: truck.truckId
        },
        data: {
          brand: truck.brand,
          model: truck.model,
          picture: truck.picture,
          plates: truck.plates
        }
      })
      return Right.create(truck)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async deleteTruck(truckId: string) {
    try {
      await this.prismaClient.truck.update({
        where: {
          id: truckId
        },
        data: {
          isActive: false
        }
      })
      return Right.create(undefined)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async getAllTrucks(): Promise<Either<ServerError, Truck[]>> {
    throw new Error()
  }
}
