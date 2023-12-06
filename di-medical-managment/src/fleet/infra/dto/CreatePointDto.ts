import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'
import { CreateInvoiceDto } from './CreateInvoiceDto'

export class CreatePointDto {
  @IsString()
  clientId: string

  @IsString()
  truckId: string

  @IsString()
  assignedUserId: string

  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDto)
  invoices: CreateInvoiceDto[]

}
