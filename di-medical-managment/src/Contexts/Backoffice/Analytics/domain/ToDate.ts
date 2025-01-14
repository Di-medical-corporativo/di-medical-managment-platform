export class ToDate {
  constructor(
    private date: Date
  ) {}

  toDate() {
    return this.date;
  }

  toPrimitives() {
    return {
      toDate: this.date.toISOString()
    }
  }
}
