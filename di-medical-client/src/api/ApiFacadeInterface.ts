import { Credentials } from "src/entities/Credentials";
import { Either } from "src/entities/Either";
import { Sucursal } from "src/entities/Sucursal";
import { User } from "src/entities/User";

export interface ApiFacadeI {
  login(credentials: Credentials): Promise<Either<string, User>>
  checkAuth(token: string): Promise<Either<string, User>>
  registerSucursal(sucursal: Sucursal): Promise<Either<string, Sucursal>>
}
