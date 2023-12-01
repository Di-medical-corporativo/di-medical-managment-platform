import { IsArray, IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string

  @IsString()
  @IsOptional()
  lastName: string

  @IsDateString()
  @IsOptional()
  birthDate: Date

  @IsString()
  @IsOptional()
  nss: string

  @IsString()
  @IsOptional()
  job: string

  @IsString()
  @IsOptional()
  picture: string

  @IsPhoneNumber('MX')
  @IsOptional()
  phone: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  sucursalId: string

  @IsArray()
  @IsOptional()
  roles: string[]
}
