import { IsOptional, IsString } from 'class-validator'

export class UpdateViewDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string
}
