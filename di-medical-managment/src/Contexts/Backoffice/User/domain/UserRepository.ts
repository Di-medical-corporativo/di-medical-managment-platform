import { AuthenticateUser } from "../../../Shared/application/Auth/AuthenticateUser";
import { UserAuthenticated } from "../../../Shared/domain/UserAuthenticated";
import { User } from "./User";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserPassword } from "./UserPassword";

export interface UserRepository {
  save(user: User, password: UserPassword): Promise<void>

  search(term: string): Promise<User | null>

  findAll(): Promise<User[]>

  update(user: User, password: UserPassword): Promise<void>

  delete(id: UserId): Promise<void>

  findByEmail(email: UserEmail): Promise<UserAuthenticated | null>;
}
