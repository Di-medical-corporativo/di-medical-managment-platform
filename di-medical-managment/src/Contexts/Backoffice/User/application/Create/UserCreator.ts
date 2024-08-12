import { SucursalFinder } from "../../../Sucursal/domain/SucursalFinder";
import { SucursalId } from "../../../Sucursal/domain/SucursalId";
import { SucursalRepository } from "../../../Sucursal/domain/SucursalRepository";
import { DuplicatedUser } from "../../domain/DuplicatedUser";
import { User } from "../../domain/User";
import { UserDate } from "../../domain/UserDate";
import { UserEmail } from "../../domain/UserEmail";
import { UserFinder } from "../../domain/UserFinder";
import { UserFirstName } from "../../domain/UserFirstName";
import { UserId } from "../../domain/UserId";
import { Role } from "../../domain/UserIsAdmin";
import { UserJob } from "../../domain/UserJob";
import { UserLastName } from "../../domain/UserLastName";
import { UserPasswordEncryptor } from "../../domain/UserPasswordEncryptor";
import { UserPhone } from "../../domain/UserPhone";
import { UserRepository } from "../../domain/UserRepository";

export class UserCreator {
  private sucursalFinder: SucursalFinder;
  
  private passwordEncryptor: UserPasswordEncryptor;
  
  private userFinder: UserFinder;

  constructor(
    private userRepository: UserRepository,
    private sucursalRepository: SucursalRepository
  ) {
    this.passwordEncryptor = new UserPasswordEncryptor();
    
    this.sucursalFinder = new SucursalFinder(this.sucursalRepository);
    
    this.userFinder = new UserFinder(this.userRepository);
  }
  
  async run(params: {
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    job: UserJob,
    phone: UserPhone,
    email: UserEmail,
    role: Role,
    sucursalId: SucursalId,
    createdAt: UserDate,
    password: string
  }) {
    const idExists = await this.ensureUserIdDoesNotExist(params.id);
    
    const emailExists = await this.ensureUserEmailDoesNotExist(params.email);
    
    if(emailExists || idExists) {
      throw new DuplicatedUser();
    }

    const sucursal = await this.sucursalFinder.run({
      id: params.sucursalId
    });

    const password = this.passwordEncryptor.run(params.password);

    const user = User.create({
      id: params.id,
      firstName: params.firstName,
      lastName: params.lastName,
      job: params.job,
      phone: params.phone,
      email: params.email,
      role: params.role,
      sucursal,
      createdAt: params.createdAt
    });

    await this.userRepository.save(user, password);
  }

  private async ensureUserIdDoesNotExist(id: UserId): Promise<boolean> {
    try {
      await this.userFinder.run(id.toString());

      return true;
    } catch (error) {
      return false;
    }
  }

  private async ensureUserEmailDoesNotExist(email: UserEmail): Promise<boolean> {
    try {
      await this.userFinder.run(email.toString());

      return true;
    } catch (error) {
      return false;
    }
  }
}
