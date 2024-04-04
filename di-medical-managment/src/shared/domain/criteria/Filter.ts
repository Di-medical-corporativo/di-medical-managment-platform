import { FilterField } from "./FIlterField";
import { FilterOperator } from "./FilterOperator";
import { FilterValue } from "./FilterValue";
import { Operator } from "./Operator";

export type FiltersPrimitives = {
	field: string;
	operator: string;
	value: string;
}

export class Filter {
  constructor(
    public readonly field: FilterField,
    public readonly operator: FilterOperator,
    public readonly value: FilterValue
  ) {}

  static fromPrimitives(field: string, operator: string, value: string): any {
    return new Filter(
			new FilterField(field),
			new FilterOperator(Operator[operator as keyof typeof Operator]),
			new FilterValue(value),
		);
  }
}
