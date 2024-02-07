import { Inject, Service } from 'typedi'
import { BaseError, ServerError } from '../../shared/domain/errors/Error'
import { Client } from '../domain/Client'
import { Either, Left, Right } from '../../shared/domain/Either'
import { DbClientRepository } from '../infra/prisma/DbClientRepository'
import { ClientRepository } from './ClientRepository'
import { CreateClientDto } from '../infra/dto/CreateClientDto'
import { UnknowError } from '../../auth/domain/Errors'
import { ClientNotFound } from '../domain/Errors'
import { UpdateClientDto } from '../infra/dto/UpdateClientDto'
import { PaginatedResult } from '../../shared/domain/PaginatedResult'

@Service()
export class ClientService {

  constructor(
    @Inject(() => DbClientRepository)
    private readonly clientRepository: ClientRepository
  ) {}


  public async getClientsPaginated(pagination: number): Promise<Either<BaseError, PaginatedResult<Client>>> {
    const clientsOrError = await this.clientRepository.getClientsPaginated(pagination)

    if(clientsOrError.isLeft()){
      return this.unfoldError(clientsOrError.error)
    }

    return clientsOrError

  }

  public async createClient(clientToCreate: CreateClientDto): Promise<Either<BaseError, Client>> {
    const client = new Client(undefined, clientToCreate.name, clientToCreate.address, true)
    const clientOrError = await this.clientRepository.createClient(client)

    if(clientOrError.isLeft()) {
      return this.unfoldError(clientOrError.error)
    }

    return clientOrError
  }

  public async getClientById(clientId: string): Promise<Either<BaseError, Client>> {
    const clientByIdOrString = await this.clientRepository.getClientById(clientId)

    if(clientByIdOrString.isLeft()) {
      return this.unfoldError(clientByIdOrString.error)
    }

    return clientByIdOrString
  }

  public async updateClientById(clientId: string, clientToupdate: UpdateClientDto): Promise<Either<BaseError, Client>> {
    const client = await this.getClientById(clientId)

    if(client.isLeft()) {
      return client
    }

    if(clientToupdate.name) {
      client.value.name = clientToupdate.name
    }

    if(clientToupdate.address) {
      client.value.address = clientToupdate.address
    }

    const clientUpdatedOrError = await this.clientRepository.updateClientById(client.value)
    
    if(clientUpdatedOrError.isLeft()) {
      return this.unfoldError(clientUpdatedOrError.error)
    }

    return clientUpdatedOrError

  }

  public async deleteClientById(clientId: string): Promise<Either<BaseError, void>> {
    const clientOrError = await this.getClientById(clientId)
    if(clientOrError.isLeft()) {
      return clientOrError
    }

    const clientDeletedOrError = await this.clientRepository.deleteClientById(clientId)

    if(clientDeletedOrError.isLeft()) {
      return this.unfoldError(clientDeletedOrError.error)
    }

    return clientDeletedOrError
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new ClientNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
