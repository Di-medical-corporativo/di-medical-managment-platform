import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateInvoiceDto } from './CreateInvoiceDto'

export class CreatePointDto {
  @IsString()
  clientId: string

  @IsString()
  truckId: string

  @IsString()
  assignedUserId: string

  @IsString()
  @IsOptional()
  surveyId: string

  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDto)
  invoices: CreateInvoiceDto[]

}
