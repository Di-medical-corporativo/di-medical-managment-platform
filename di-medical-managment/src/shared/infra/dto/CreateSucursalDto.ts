import { IsPhoneNumber, IsString } from 'class-validator'

export class CreateSucursalDto {
  @IsString()
  name: string

  @IsString()
  address: string

  @IsPhoneNumber('MX')
  phone: string

  @IsString()
  dimedicalBrand: string
}
