import { SucursalRepository } from "../../domain/SucursalRepository";
import { Sucursal } from "../../domain/Sucursal";
import { SucursalId } from "../../domain/SucursalId";
import { SucursalName } from "../../domain/SucursalName";
import { SucursalAddress } from "../../domain/SucursalAddress";
import { SucursalPhone } from "../../domain/SucursalPhone";

interface SucursalDb {
  id: string;
  address: string;
  name: string;
  phone: string;
}

export class FakeSucursalRepository implements SucursalRepository {
  private sucursales: SucursalDb[] = [];

  async save(sucursal: Sucursal): Promise<void> {
    const sucursalPlain = sucursal.toPrimitives();
    this.sucursales.push({
      id: sucursalPlain.id,
      address: sucursalPlain.address,
      name: sucursalPlain.name,
      phone: sucursalPlain.phone
    });
  }

  async search(id: SucursalId): Promise<Sucursal | null> {
    const sucursalDb = this.sucursales.find(sucursal => sucursal.id === id.value);
    if (!sucursalDb) {
      return null;
    }
    return new Sucursal(
      new SucursalId(sucursalDb.id),
      new SucursalName(sucursalDb.name),
      new SucursalAddress(sucursalDb.address),
      new SucursalPhone(sucursalDb.phone)
    );
  }

  async update(sucursal: Sucursal): Promise<void> {
    const sucursalPlain = sucursal.toPrimitives();
    const index = this.sucursales.findIndex(s => s.id === sucursalPlain.id);
    if (index !== -1) {
      this.sucursales[index] = {
        id: sucursalPlain.id,
        address: sucursalPlain.address,
        name: sucursalPlain.name,
        phone: sucursalPlain.phone
      };
    }
  }
}
