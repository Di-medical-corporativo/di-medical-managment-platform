import { Sucursal } from "../../Sucursal/domain/Sucursal";
import { UserDate } from "./UserDate";
import { UserEmail } from "./UserEmail";
import { UserFirstName } from "./UserFirstName";
import { UserId } from "./UserId";
import { Role } from "./UserIsAdmin";
import { UserJob } from "./UserJob";
import { UserLastName } from "./UserLastName";
import { UserPhone } from "./UserPhone";

export class User {
  constructor(
    private id: UserId,
    private firstName: UserFirstName,
    private lastName: UserLastName,
    private job: UserJob,
    private phone: UserPhone,
    private email: UserEmail,
    private role: Role,
    private sucursal: Sucursal,
    private createdAt: UserDate
  ) {}

  public updateName(firstName: UserFirstName, lastName: UserLastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public updateJob(job: UserJob) {
    this.job = job;
  }

  public updatePhone(phone: UserPhone) {
    this.phone = phone;
  }

  public updateEmail(email: UserEmail) {
    this.email = email;
  }

  public updateRole(role: Role) {
    this.role = role;
  }

  public updateSucursal(sucursal: Sucursal) {
    this.sucursal = sucursal;
  }
 
  static create(data: {
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    job: UserJob,
    phone: UserPhone,
    email: UserEmail,
    role: Role,
    sucursal: Sucursal
    createdAt: UserDate
  }) {
    return new User(
      data.id,
      data.firstName,
      data.lastName,
      data.job,
      data.phone,
      data.email,
      data.role,
      data.sucursal,
      data.createdAt
    );
  }

  public static fromPrimitives(data: {
    id: string;
    firstName: string;
    lastName: string;
    job: string;
    phone: string;
    email: string;
    role: string;
    sucursal: {
      sucursalId: string;
      sucursalName: string;
      sucursalAddress: string;
      sucursalPhone: string;
    };
    createdAt: string;
  }) {
    return new User(
      new UserId(data.id),
      new UserFirstName(data.firstName),
      new UserLastName(data.lastName),
      new UserJob(data.job),
      new UserPhone(data.phone),
      new UserEmail(data.email),
      new Role(data.role),
      Sucursal.fromPrimitives({
        id: data.sucursal.sucursalId,
        name: data.sucursal.sucursalName,
        address: data.sucursal.sucursalAddress,
        phone: data.sucursal.sucursalPhone
      }),
      new UserDate(data.createdAt)
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      firstName: this.firstName.toString(),
      lastName: this.lastName.toString(),
      job: this.job.toString(),
      phone: this.phone.toString(),
      email: this.email.toString(),
      role: this.role.toString(),
      sucursal: this.sucursal.toPrimitives(),
      createdAt: this.createdAt.toString()
    }
  }
}
