import { OrderTypes } from "./OrderTypes";

export class OrderType {
  constructor(
    public readonly value: OrderTypes
  ) {}

  public isNone() {
    return this.value === OrderTypes.NONE
  }
}
