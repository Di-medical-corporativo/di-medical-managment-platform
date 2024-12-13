import { Module } from "../../../../Shared/domain/Module";
import { ModuleFinder } from "../../../../Shared/domain/ModuleFinder";
import { ModuleId } from "../../../../Shared/domain/ModuleId";
import { ModuleRepository } from "../../../../Shared/domain/ModuleRepository";
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
import { UserJob } from "../../domain/UserJob";
import { UserLastName } from "../../domain/UserLastName";
import { UserPassword } from "../../domain/UserPassword";
import { UserPasswordEncryptor } from "../../domain/UserPasswordEncryptor";
import { UserPhone } from "../../domain/UserPhone";
import { UserRepository } from "../../domain/UserRepository";

export class UserCreator {
  private sucursalFinder: SucursalFinder;
  
  private passwordEncryptor: UserPasswordEncryptor;
  
  private userFinder: UserFinder;

  private moduleFinder: ModuleFinder;

  constructor(
    private userRepository: UserRepository,
    private sucursalRepository: SucursalRepository,
    private moduleRepository: ModuleRepository
  ) {
    this.passwordEncryptor = new UserPasswordEncryptor();
    
    this.sucursalFinder = new SucursalFinder(this.sucursalRepository);
    
    this.userFinder = new UserFinder(this.userRepository);

    this.moduleFinder = new ModuleFinder(this.moduleRepository);
  }
  
  async run(params: {
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    job: UserJob,
    phone: UserPhone,
    email: UserEmail,
    sucursalId: SucursalId,
    createdAt: UserDate,
    modulesIds: ModuleId[]
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

    const modulesPromises = params.modulesIds.map(async m => {
      return await this.moduleFinder.run({
        id: m
      })
    });
    
    const modules = await Promise.all(modulesPromises);

    const password: UserPassword = this.passwordEncryptor.run(params.password);

    const user = User.create({
      id: params.id,
      firstName: params.firstName,
      lastName: params.lastName,
      job: params.job,
      phone: params.phone,
      email: params.email,
      modules,
      sucursal,
      createdAt: params.createdAt
    });

    console.log(user.toPrimitives());

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
