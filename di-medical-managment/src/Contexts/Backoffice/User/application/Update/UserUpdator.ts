import { ModuleFinder } from "../../../../Shared/domain/ModuleFinder";
import { ModuleId } from "../../../../Shared/domain/ModuleId";
import { ModuleRepository } from "../../../../Shared/domain/ModuleRepository";
import { SucursalFinder } from "../../../Sucursal/domain/SucursalFinder";
import { SucursalId } from "../../../Sucursal/domain/SucursalId";
import { SucursalRepository } from "../../../Sucursal/domain/SucursalRepository";
import { UserDate } from "../../domain/UserDate";
import { UserEmail } from "../../domain/UserEmail";
import { UserFinder } from "../../domain/UserFinder";
import { UserFirstName } from "../../domain/UserFirstName";
import { UserId } from "../../domain/UserId";
import { Role } from "../../domain/UserIsAdmin";
import { UserJob } from "../../domain/UserJob";
import { UserLastName } from "../../domain/UserLastName";
import { UserPassword } from "../../domain/UserPassword";
import { UserPasswordEncryptor } from "../../domain/UserPasswordEncryptor";
import { UserPhone } from "../../domain/UserPhone";
import { UserRepository } from "../../domain/UserRepository";

export class UserUpdator {
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
    modulesIds: ModuleId[],
    sucursalId: SucursalId,
    createdAt: UserDate,
    password: string
  }) {
    
    const user = await this.userFinder.run(params.id.toString());

    const modulesPromises = params.modulesIds.map(async m => {
      return await this.moduleFinder.run({
        id: m
      })
    });
    
    const modules = await Promise.all(modulesPromises);

    const sucursal = await this.sucursalFinder.run({
      id: params.sucursalId
    });

    const password: UserPassword = this.passwordEncryptor.run(params.password);

    user.updateEmail(params.email);

    user.updateJob(params.job);
    
    user.updateName(params.firstName, params.lastName);
    
    user.updatePhone(params.phone);
        
    user.updateSucursal(sucursal);
    
    user.updateModules(modules);

    await this.userRepository.update(user, password);
  }
}
