import { Filter, FiltersPrimitives } from "./Filter";

export class Filters {
  constructor(
    public readonly value: Filter[]
  ) {}

  public static fromPrimitives(filters: FiltersPrimitives[]): Filters {
    return new Filters(
      filters.map((filter) => Filter.fromPrimitives(
        filter.field,
        filter.operator,
        filter.value
      ))
    )
  }

  public isEmpty() {
    return this.value.length === 0
  }
}
