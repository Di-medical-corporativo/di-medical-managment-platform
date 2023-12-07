import { Invoce } from '@prisma/client'
import { Invoice as DomainInvoice } from '../../domain/Invoice'

export class ModelToDomainInvoice {
  public static fromInvoices(invoices: Invoce[]) {
    const domainInvoices = invoices.map((invoice) => {
      return new DomainInvoice(
        invoice.invoceId,
        invoice.invoiceNumber,
        invoice.description
      )
    })

    return domainInvoices
  }
}
