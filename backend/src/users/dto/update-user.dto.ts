import { IsEmail, IsOptional, IsString, MinLength, IsDateString, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsString()
  @IsOptional()
  aboutMe?: string | null;

  @IsString()
  @IsOptional()
  streetAddress?: string | null;

  @IsString()
  @IsOptional()
  city?: string | null;

  @IsString()
  @IsOptional()
  state?: string | null;

  @IsString()
  @IsOptional()
  zipCode?: string | null;

  @IsDateString()
  @IsOptional()
  birthdate?: string | null;

  @IsInt()
  @IsOptional()
  @Min(1)
  stepNumber?: number;
}
