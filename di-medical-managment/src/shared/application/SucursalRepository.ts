import { Either } from '../../shared/domain/Either'
import { ServerError } from '../../shared/domain/errors/Error'
import { Sucursal } from '../domain/Sucursal'

export interface SucursalRepository {
  createSucursal(sucursal: Sucursal): Promise<Either<ServerError, Sucursal>>
  updateSucursal(sucursal: Sucursal): Promise<Either<ServerError, Sucursal>>
  deleteSucursalById(resourceId: string): Promise<Either<ServerError, void>>
  findSucursalById(id: string): Promise<Either<ServerError, Sucursal>>
  getAllSucursal(): Promise<Either<ServerError, Sucursal[]>>
}
