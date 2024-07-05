import { SucursalId } from "./SucursalId";
import { SucursalNotFound } from "./SucursalNotFound";
import { SucursalRepository } from "./SucursalRepository";

export class SucursalFinder {
  constructor(
    private sucursalRepository: SucursalRepository
  ) {}

  async run(params: {
    id: SucursalId
  }) {
    const sucursal = await this.sucursalRepository.search(params.id);
    
    if(sucursal === null) {
      throw new SucursalNotFound();
    }

    return sucursal;
  }
}
