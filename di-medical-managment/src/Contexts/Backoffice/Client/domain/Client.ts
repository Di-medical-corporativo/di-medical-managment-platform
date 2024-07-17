import { ClientAddress } from "./ClientAddress";
import { ClientId } from "./ClientId";
import { ClientIsActive } from "./ClientIsActive";
import { ClientName } from "./ClientName";

export class Client {
  constructor(
    private id: ClientId,
    private name: ClientName,
    private address: ClientAddress,
    private isActive: ClientIsActive
  ) {}

  updateName(name: ClientName) {
    this.name = name;
  }

  updateAddress(address: ClientAddress) {
    this.address = address;
  }

  static create(params: {
    id: ClientId;
    name: ClientName;
    address: ClientAddress;
  }) {
    return new Client(
      params.id,
      params.name,
      params.address,
      new ClientIsActive(true)
    );
  }

  static fromPrimitives(params: {
    id: string;
    name: string;
    address: string;
    isActive: boolean
  }) {
    return new Client(
      new ClientId(params.id),
      new ClientName(params.name),
      new ClientAddress(params.address),
      new ClientIsActive(params.isActive)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      address: this.address.toString(),
      isActive: this.isActive.value
    }
  }
}
