import { User } from "./User";
import { UserId } from "./UserId";
import { UserPassword } from "./UserPassword";

export interface UserRepository {
  save(user: User, password: UserPassword): Promise<void>

  search(term: string): Promise<User | null>

  findAll(): Promise<User[]>

  update(user: User, password: UserPassword): Promise<void>

  delete(id: UserId): Promise<void>
}
