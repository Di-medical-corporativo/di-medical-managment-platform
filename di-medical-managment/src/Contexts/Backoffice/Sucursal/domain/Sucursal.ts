import { SucursalAddress } from "./SucursalAddress";
import { SucursalId } from "./SucursalId";
import { SucursalName } from "./SucursalName";
import { SucursalPhone } from "./SucursalPhone";

export class Sucursal {
  constructor(
    private id: SucursalId,
    private name: SucursalName,
    private address: SucursalAddress,
    private phone: SucursalPhone
  ) {}

  static create(data: {
    id: SucursalId,
    name: SucursalName,
    address: SucursalAddress,
    phone: SucursalPhone
  }): Sucursal {
    return new Sucursal(
      data.id,
      data.name,
      data.address,
      data.phone
    );
  }

  updateName(name: SucursalName) {
    this.name = name;
  }

  updateAddress(add: SucursalAddress) {
    this.address = add;
  }

  updatePhone(phone: SucursalPhone) {
    this.phone = phone;
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      address: this.address.toString(),
      phone: this.phone.toString()
    };
  }

  public static fromPrimitives(data: {
    id: string;
    name: string;
    address: string;
    phone: string;
  }): Sucursal {
    return new Sucursal(
      new SucursalId(data.id),
      new SucursalName(data.name),
      new SucursalAddress(data.address),
      new SucursalPhone(data.phone)
    );
  }
}
