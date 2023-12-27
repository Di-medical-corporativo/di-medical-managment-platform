import { IsArray, IsDateString, IsEmail, IsPhoneNumber, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsDateString()
  birthDate: Date

  @IsString()
  nss: string

  @IsString()
  job: string

  @IsPhoneNumber('MX')
  phone: string

  @IsEmail()
  email: string

  @IsString()
  sucursalId: string

  @IsString()
  password: string

  @IsArray()
  roles: string[]
}
