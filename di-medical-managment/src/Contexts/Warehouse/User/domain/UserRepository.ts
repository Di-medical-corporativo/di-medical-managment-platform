import { User } from "./User";
import { UserPassword } from "./UserPassword";

export interface UserRepository {
  save(user: User, password: UserPassword): Promise<void>
  search(term: string): Promise<User | null>
}
