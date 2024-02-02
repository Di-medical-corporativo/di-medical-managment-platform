import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdatePoinDto {
  @IsOptional()
  @IsString()
  comment: string
  @IsBoolean()
  problem: boolean
}
