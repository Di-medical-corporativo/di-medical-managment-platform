import { ToDate } from "./ToDate";

export class FromDate {
  constructor(
    private date: Date
  ) {}

  public daysDifferenceWith(to: ToDate): number {
    const toDate = to.toDate();
    
    const range = (toDate.getTime() - this.date.getTime()) / (1000 * 60 * 60 * 24);

    return range;
  }

  toDate() {
    return this.date;
  }

  toPrimivies() {
    return {
      fromDate: this.date.toISOString()
    }
  }
}
