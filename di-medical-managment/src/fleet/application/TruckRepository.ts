import { Either } from '../../shared/domain/Either'
import { PaginatedResult } from '../../shared/domain/PaginatedResult'
import { ServerError } from '../../shared/domain/errors/Error'
import { Incident } from '../domain/Incident'
import { Truck } from '../domain/Truck'

export interface TruckRespository {
  getAllTrucks(): Promise<Either<ServerError, Truck[]>>
  createTruck (truck: Truck): Promise<Either<ServerError, Truck>>
  getTruckById (truckId: string): Promise<Either<ServerError, Truck>>
  addIncident (truck: Truck, incident: Incident): Promise<Either<ServerError, Truck>>
  getIncidentById (incidentId: string): Promise<Either<ServerError, Incident>>
  removeIncident (truck: Truck, incident: Incident): Promise<Either<ServerError, Truck>>
  updateTruck (truck: Truck): Promise<Either<ServerError, Truck>>
  deleteTruck (truckId: string): Promise<Either<ServerError, void>>
  getTrucksPaginated(page: number): Promise<Either<ServerError, PaginatedResult<Truck>>>
}
