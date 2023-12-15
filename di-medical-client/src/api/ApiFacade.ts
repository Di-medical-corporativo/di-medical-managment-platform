import { Credentials } from "src/entities/Credentials";
import { Either, Left, Right } from "src/entities/Either";
import { User } from "src/entities/User";
import { ApiFacadeI } from "./ApiFacadeInterface";
import { api } from "src/boot/axios";

export class ApiFacade implements ApiFacadeI {
  async login(credentials: Credentials): Promise<Either<string, string>> {
    try {
      const user = await api.post('/auth/login', {
        
      })
      return Right.create("")
    } catch (error) {
      return Left.create("")
    }
  }
}
