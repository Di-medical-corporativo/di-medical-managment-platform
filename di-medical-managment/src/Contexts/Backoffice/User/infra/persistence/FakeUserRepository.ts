import { User } from "../../domain/User";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class FakeUserRepository implements UserRepository {
  private users: User[] = [];
  private login: UserPassword[] = [];

  async save(user: User, password: UserPassword): Promise<void> {
    const existingUserIndex = this.users.findIndex(u => u.toPrimitives().id === user.toPrimitives().id);
    if (existingUserIndex !== -1) {
      this.users[existingUserIndex] = user;
      this.login[existingUserIndex] = password;
    } else {
      this.users.push(user);
      this.login.push(password);
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.toPrimitives().id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async search(term: string): Promise<User | null> {
    return this.users.find(user => 
      user.toPrimitives().id === term || user.toPrimitives().email === term
    ) || null;
  }

  async update(user: User, password: UserPassword): Promise<void> {
      
  }
}
