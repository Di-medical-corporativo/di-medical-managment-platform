import { Truck } from '@prisma/client'
import { Truck as DomainTruck } from '../../domain/Truck'

export class ModelToDomainTruck {
  public static from (truck: Truck) {
    return new DomainTruck(
      truck.id,
      truck.plates,
      truck.model,
      truck.brand,
      truck.picture,
      truck.isActive
    )
  }

  public static fromTrucks(truck: Truck[]) {
    const domainTrucks = truck.map((truck) => new DomainTruck(
      truck.id,
      truck.plates,
      truck.model,
      truck.brand,
      truck.picture,
      truck.isActive
    ))
    return domainTrucks
  }
}
