import { IsArray, IsString, ArrayNotEmpty, IsOptional } from 'class-validator';

export class UpdateOnboardingConfigDto {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  stepOne?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  stepTwo?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  stepThree?: string[];
}
