import { SucursalId } from "../../Sucursal/domain/SucursalId";
import { SucursalName } from "../../Sucursal/domain/SucursalName";

export class ItinerarySucursal {
  constructor(
    private id: SucursalId,
    private name: SucursalName
  ) {}

  static fromPrimitives(params: {
    id: string;
    name: string;
  }) {
    return new ItinerarySucursal(
      new SucursalId(params.id),
      new SucursalName(params.name)
    );
  }

  static create(params: {
    id: SucursalId,
    name: SucursalName    
  }) {
    return new ItinerarySucursal(
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
