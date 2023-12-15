import { Credentials } from "src/entities/Credentials";
import { Either } from "src/entities/Either";
import { User } from "src/entities/User";

export interface ApiFacadeI {
  login(credentials: Credentials): Promise<Either<string, string>>
}
