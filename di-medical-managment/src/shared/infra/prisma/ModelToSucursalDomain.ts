import { Sucursal } from "@prisma/client";
import { Sucursal as SucursalDomain } from "../../domain/Sucursal"

export class ModelToDomainSucursal {
  public static from(sucursal: Sucursal) {
    return new SucursalDomain(
      sucursal.id,
      sucursal.name,
      sucursal.address,
      sucursal.phone,
      sucursal.dimedicalBrand
    )
  }
} 
