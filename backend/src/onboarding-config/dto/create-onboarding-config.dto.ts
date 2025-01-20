import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateOnboardingConfigDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  stepOne!: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  stepTwo!: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  stepThree!: string[];
}
