import { Sucursal } from "./Sucursal";

export interface SucursalRepository {
  save(sucursal: Sucursal): Promise<void>
}
