import { IsArray, IsOptional, IsString } from 'class-validator'

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsArray()
  @IsOptional()
  resources: string[]
}
