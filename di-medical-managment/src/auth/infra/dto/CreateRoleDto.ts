import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  name: string
  @IsString()
  description: string
  @IsOptional()
  @IsArray()
  resources: string[]
}
