import { IsOptional, IsString } from 'class-validator'

export class CreateInvoiceDto {
  
  @IsString()
  invoiceNumber: string

  @IsString()
  @IsOptional()
  description: string
}
