import { Client } from "src/entities/Client";
import { Credentials } from "src/entities/Credentials";
import { Either } from "src/entities/Either";
import { PaginatedResult } from "src/entities/PaginatedResult";
import { Resource } from "src/entities/Resource";
import { Role } from "src/entities/Role";
import { Sucursal } from "src/entities/Sucursal";
import { User } from "src/entities/User";

export interface ApiFacadeI {
  login(credentials: Credentials): Promise<Either<string, User>>
  checkAuth(token: string): Promise<Either<string, User>>
  registerSucursal(sucursal: Sucursal): Promise<Either<string, Sucursal>>
  getRoles(): Promise<Either<string, Role[]>>
  getBranches(): Promise<Either<string, Sucursal[]>>
  registerUser(user: User): Promise<Either<string, User>>
  getAllUsersPaginated(page: number): Promise<Either<string, PaginatedResult<User>>>
  registerClient(client: Client): Promise<Either<string, Client>>
}
