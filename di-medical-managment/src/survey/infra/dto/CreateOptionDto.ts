import { IsInt, IsPositive, IsString } from 'class-validator'

export class CreateOptionDto {
  @IsString()
  value: string

  @IsInt()
  @IsPositive()
  order: number
}
