import { IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class UpdateSucursalDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  address: string

  @IsPhoneNumber('MX')
  @IsOptional()
  phone: string

  @IsString()
  @IsOptional()
  dimedicalBrand: string
}
