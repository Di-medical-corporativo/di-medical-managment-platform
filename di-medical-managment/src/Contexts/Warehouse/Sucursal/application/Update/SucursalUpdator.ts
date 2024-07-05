import { SucursalAddress } from '../../domain/SucursalAddress';
import { SucursalFinder } from '../../domain/SucursalFinder';
import { SucursalId } from '../../domain/SucursalId';
import { SucursalName } from '../../domain/SucursalName';
import { SucursalPhone } from '../../domain/SucursalPhone';
import { SucursalRepository } from '../../domain/SucursalRepository';

export class SucursalUpdator {
  private sucursalFinder: SucursalFinder;
  
  constructor(
    private sucursalRepository: SucursalRepository
  ) {
    this.sucursalFinder = new SucursalFinder(sucursalRepository);
  }
  
  async run(params: {
    id: SucursalId,
    name: SucursalName,
    address: SucursalAddress,
    phone: SucursalPhone
  }) {
    const sucursal = await this.sucursalFinder.run({
      id: params.id
    });

    sucursal.updateName(params.name);
    sucursal.updateAddress(params.address);
    sucursal.updatePhone(params.phone);

    await this.sucursalRepository.update(sucursal);
  }

}
