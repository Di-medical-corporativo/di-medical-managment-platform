import { Client } from "src/entities/Client";
import { Either } from "src/entities/Either";
import { PaginatedResult } from "src/entities/PaginatedResult";
import { Role } from "src/entities/Role";
import { Sucursal } from "src/entities/Sucursal";

export interface ApiFacadeI {
  registerSucursal(sucursal: Sucursal): Promise<Either<string, Sucursal>>
  getRoles(): Promise<Either<string, Role[]>>
  getBranches(): Promise<Either<string, Sucursal[]>>
  registerClient(client: Client): Promise<Either<string, Client>>
  getAllClientsPaginated(page: number): Promise<Either<string, PaginatedResult<Client>>>
}
