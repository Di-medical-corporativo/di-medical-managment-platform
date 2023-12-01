import { Inject, Service } from 'typedi'
import { TruckRespository } from './TruckRepository'
import { DbTruckRepository } from '../infra/prisma/DbTruckRepository'
import { CreateTruckDto } from '../infra/dto/CreateTruckDto'
import { Truck } from '../domain/Truck'
import { BaseError, ServerError } from '../../shared/domain/errors/Error'
import { Either, Left, Right } from '../../shared/domain/Either'
import { UnknowError } from '../../auth/domain/Errors'
import { TruckNotFound } from '../domain/Errors'
import { CreateIncidentDto } from '../infra/dto/CreateIncidentDto'
import { Incident } from '../domain/Incident'
import { UpdateTruckDto } from '../infra/dto/UpdateTruckDto'

@Service()
export class TruckService {
  constructor(
    @Inject(() => DbTruckRepository)
    private readonly truckRepository: TruckRespository
  ) {}
  
  public async createTruck(truckToCreate: CreateTruckDto): Promise<Either<BaseError, Truck>> {
    const truck = new Truck(
      undefined,
      truckToCreate.plates,
      truckToCreate.model,
      truckToCreate.brand,
      truckToCreate.picture,
      true
    )

    const truckCreatedOrError = await this.truckRepository.createTruck(truck)
    if(truckCreatedOrError.isLeft()) {
      return this.unfoldError(truckCreatedOrError.error)
    }

    return Right.create(truck)
  }

  public async getTruckById (truckId: string): Promise<Either<BaseError, Truck>> {
    const truckOrError = await this.truckRepository.getTruckById(truckId)
    if(truckOrError.isLeft()) {
      return this.unfoldError(truckOrError.error)
    }

    return Right.create(truckOrError.value)
  }

  public async addIncidentToTruck(truckId: string, incidentToCreate: CreateIncidentDto): Promise<Either<BaseError, Truck>> {
    const truckOrError = await this.getTruckById(truckId)
    if(truckOrError.isLeft()) {
      return truckOrError
    }

    const incident = new Incident(
      undefined,
      incidentToCreate.description,
      incidentToCreate.picture,
      true,
      new Date()
    )
    incident.finishDate = new Date()

    const truckModifiedOrError = await this.truckRepository.addIncident(
      truckOrError.value,
      incident
    )

    if(truckModifiedOrError.isLeft()) {
      return this.unfoldError(truckModifiedOrError.error)
    }

    return Right.create(truckModifiedOrError.value)
  }

  public async removeIncident (truckById: string, incidentId: string): Promise<Either<BaseError, Truck>> {
    const incidentOrError = await this.getIncidentByid(incidentId)
    if(incidentOrError.isLeft()) {
      return incidentOrError
    }

    const truckOrError = await this.getTruckById(truckById)

    if(truckOrError.isLeft()) {
      return truckOrError
    }

    const truckModifiedOrError = await this.truckRepository.removeIncident(truckOrError.value, incidentOrError.value)

    if(truckModifiedOrError.isLeft()) {
      return this.unfoldError(truckModifiedOrError.error)
    }

    return Right.create(truckModifiedOrError.value)
  }
  
  public async getIncidentByid (incidentId: string): Promise<Either<BaseError, Incident>> {
    const incidentOrError = await this.truckRepository.getIncidentById(incidentId)
    if(incidentOrError.isLeft()) {
      return this.unfoldError(incidentOrError.error)
    }

    return Right.create(incidentOrError.value)
  }

  public async updateTruck (truckId: string, truckToUpdate: UpdateTruckDto): Promise<Either<BaseError, Truck>> {
    const truckOrErrror = await this.getTruckById(truckId)
    if(truckOrErrror.isLeft()) {
      return truckOrErrror
    }

    if(truckToUpdate.brand) {
      truckOrErrror.value.brand =truckToUpdate.brand
    }

    if(truckToUpdate.model) {
      truckOrErrror.value.model = truckToUpdate.model
    }

    if(truckToUpdate.picture) {
      truckOrErrror.value.picture = truckToUpdate.picture
    }

    if(truckToUpdate.plates) {
      truckOrErrror.value.plates = truckToUpdate.plates
    }

    const truckUpdatedOrError = await this.truckRepository.updateTruck(truckOrErrror.value)

    if(truckUpdatedOrError.isLeft()) {
      return this.unfoldError(truckUpdatedOrError.error)
    }

    return Right.create(truckUpdatedOrError.value)
  }

  public async deleteTruck(truckId: string): Promise<Either<BaseError, void>> {
    const truckOrError = await this.getTruckById(truckId)
    if(truckOrError.isLeft()) {
      return truckOrError
    }

    const truckDeletedOrError = await this.truckRepository.deleteTruck(truckId)

    if(truckDeletedOrError.isLeft()) {
      return this.unfoldError(truckDeletedOrError.error)
    }

    return Right.create(undefined)

  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new TruckNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
