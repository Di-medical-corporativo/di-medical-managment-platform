import { InvoiceId } from "./InvoiceId";
import { InvoiceNumber } from "./InvoiceNumber";

export class Invoice {
  constructor(
    private id: InvoiceId,
    private number: InvoiceNumber
  ) {}

  static fromPrimitives(params: {
    id: string,
    number: string
  }) {
    return new Invoice(
      new InvoiceId(params.id),
      new InvoiceNumber(params.number)
    );
  }

  static create(params: {
    id: InvoiceId,
    number: InvoiceNumber
  }) {
    return new Invoice(
      params.id,
      params.number
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      number: this.number.toString()
    }
  }
}
