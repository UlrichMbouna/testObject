import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateObjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
