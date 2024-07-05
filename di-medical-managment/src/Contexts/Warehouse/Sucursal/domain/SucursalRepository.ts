import { Sucursal } from "./Sucursal";
import { SucursalId } from "./SucursalId";

export interface SucursalRepository {
  save(sucursal: Sucursal): Promise<void>
  update(sucursal: Sucursal): Promise<void>
  search(id: SucursalId): Promise<Sucursal | null>
}
