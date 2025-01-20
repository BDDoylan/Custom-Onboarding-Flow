import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsDateString, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

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
  @IsNotEmpty()
  @Min(1)
  stepNumber!: number;
}
