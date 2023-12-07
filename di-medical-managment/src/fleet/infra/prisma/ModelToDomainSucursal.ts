import { Sucursal } from "@prisma/client";
import { Sucursal as DomainSucursal } from "../../../shared/domain/Sucursal";

export class ModelToDomainSucursal {
  public static from(sucursal: Sucursal) {
    const sucursalDomain = new DomainSucursal(
      sucursal.id,
      sucursal.name,
      sucursal.address,
      sucursal.phone,
      sucursal.dimedicalBrand
    )

    return sucursalDomain
  }
}
