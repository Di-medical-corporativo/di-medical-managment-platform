import { FiltersPrimitives } from "./Filter";
import { Filters } from "./Filters";
import { Order } from "./Order";

export class Criteria {
  constructor(
    public readonly filters: Filters,
    public readonly order: Order
  ) {}

  public static fromPrimitives(
    filtersPrimitives: FiltersPrimitives[],
    orderBy: string | null,
    orderType: string | null
  ) {
    
    return new Criteria(
      Filters.fromPrimitives(filtersPrimitives),
      Order.fromPrimitives(orderBy, orderType),
    )
  }

  public hasFilters(): boolean {
    return !this.filters.isEmpty()
  }

  public hasOrder(): boolean {
    return !this.order.isNone()
  }

}
