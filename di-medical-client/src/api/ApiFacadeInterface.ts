import { Client } from "src/entities/Client";
import { Credentials } from "src/entities/Credentials";
import { Either } from "src/entities/Either";
import { PaginatedResult } from "src/entities/PaginatedResult";
import { Resource } from "src/entities/Resource";
import { Role } from "src/entities/Role";
import { Sucursal } from "src/entities/Sucursal";
import { Truck } from "src/entities/Truck";
import { User } from "src/entities/User";

export interface ApiFacadeI {
  registerSucursal(sucursal: Sucursal): Promise<Either<string, Sucursal>>
  getRoles(): Promise<Either<string, Role[]>>
  getBranches(): Promise<Either<string, Sucursal[]>>
  registerClient(client: Client): Promise<Either<string, Client>>
  getAllClientsPaginated(page: number): Promise<Either<string, PaginatedResult<Client>>>
  createTruck(truck: Truck): Promise<Either<string, Truck>>
}
