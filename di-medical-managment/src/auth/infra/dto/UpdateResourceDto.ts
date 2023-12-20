import { IsArray, IsOptional, IsString } from 'class-validator'

export class UpdateResourceDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string
}
