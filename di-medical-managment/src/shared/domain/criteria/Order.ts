import { OrderBy } from "./OrderBy";
import { OrderType } from "./OrderType";
import { OrderTypes } from "./OrderTypes";

export class Order {
  constructor(
    public readonly orderBy: OrderBy,
    public readonly orderType: OrderType
  ) {}

  static none(): Order {
    return new Order(new OrderBy(""), new OrderType(OrderTypes.NONE))
  }

  static fromPrimitives(orderBy: string | null, orderType: string | null): Order {
		return orderBy !== null
			? new Order(new OrderBy(orderBy), new OrderType(orderType as OrderTypes))
			: Order.none();
	}

  public isNone() {
    return this.orderType.isNone()
  }
}
