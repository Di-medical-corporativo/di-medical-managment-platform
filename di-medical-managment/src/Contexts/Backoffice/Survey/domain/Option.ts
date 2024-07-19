import { OptionId } from "./OptionId";
import { OptionOrder } from "./OptionOrder";
import { OptionValue } from "./OptionValue";

export class Option {
  constructor(
    private id: OptionId,
    private value: OptionValue,
    private order: OptionOrder
  ) {}
  
  public static create(params: {
    id: OptionId,
    value: OptionValue,
    order: OptionOrder
  }) {
    return new Option(
      params.id,
      params.value,
      params.order
    );
  }

  static fromPrimitives(params: {
    id: string;
    value: string;
    order: number
  }) {
    return new Option(
      new OptionId(params.id),
      new OptionValue(params.value),
      new OptionOrder(params.order)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      value: this.value.toString(),
      order: this.order.value
    }
  }
}
