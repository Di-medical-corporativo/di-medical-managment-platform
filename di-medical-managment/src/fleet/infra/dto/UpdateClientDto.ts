import { IsOptional, IsString } from "class-validator";

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  address: string
}
