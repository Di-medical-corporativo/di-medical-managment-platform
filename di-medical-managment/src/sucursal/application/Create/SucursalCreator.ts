import { Sucursal } from "../../domain/Sucursal";
import { SucursalAddress } from "../../domain/SucursalAddress";
import { SucursalId } from "../../domain/SucursalId";
import { SucursalName } from "../../domain/SucursalName";
import { SucursalPhone } from "../../domain/SucursalPhone";
import { PrismaSucursalRepository } from "../../infra/prisma/PrismaSucursalRepository";

export class SucursalCreator {
  constructor(
    private prismaSucursalRepository: PrismaSucursalRepository
  ) {}

  async run(params: {
    id: SucursalId;
    name: SucursalName;
    address: SucursalAddress;
    phone: SucursalPhone;
  }) {
    const sucursal = Sucursal.create(params);
  
    await this.prismaSucursalRepository.save(sucursal);
  }
}
