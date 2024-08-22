import { ClientId } from "../../Client/domain/ClientId";
import { ClientName } from "../../Client/domain/ClientName";

export class PointClient {
  constructor(
    private id: ClientId,
    private name: ClientName
  ) {}

  static fromPrimitives(params: {
    id: string;
    name: string;
  }) {
    return new PointClient(
      new ClientId(params.id),
      new ClientName(params.name)
    );
  }

  static create(params: {
    id: ClientId,
    name: ClientName
  }) {
    return new PointClient(
      params.id,
      params.name
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString()
    }
  }
}
