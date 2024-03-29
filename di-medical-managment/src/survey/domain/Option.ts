export class Option {
  private _totalAnswers = 0
  constructor(
    private _id: string | undefined,
    private _value: string,
    private _order: number
  ) {}

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  set totalAnswers(total: number) {
    this._totalAnswers = total
  }

  get totalAnswers() {
    return this._totalAnswers
  }
}
