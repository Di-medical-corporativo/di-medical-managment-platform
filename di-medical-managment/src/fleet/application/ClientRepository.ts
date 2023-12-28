import { Either } from '../../shared/domain/Either'
import { PaginatedResult } from '../../shared/domain/PaginatedResult'
import { ServerError } from '../../shared/domain/errors/Error'
import { Client } from '../domain/Client'

export interface ClientRepository {
  createClient(client: Client): Promise<Either<ServerError, Client>>
  getClientById(clientId: string): Promise<Either<ServerError, Client>>
  updateClientById(client: Client): Promise<Either<ServerError, Client>>
  deleteClientById(clientId: string): Promise<Either<ServerError, void>>
  getClientsPaginated(page: number): Promise<Either<ServerError, PaginatedResult<Client>>>
}
