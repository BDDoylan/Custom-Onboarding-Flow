import { Controller, Get, Post, Delete, Body, Patch, Param } from '@nestjs/common';
import { OnboardingConfigService } from './onboarding-config.service';
import { CreateOnboardingConfigDto } from './dto/create-onboarding-config.dto';
import { UpdateOnboardingConfigDto } from './dto/update-onboarding-config.dto';

@Controller('onboarding_config')
export class OnboardingConfigController {
  constructor(private readonly onboardingConfigService: OnboardingConfigService) {}

  @Post()
  create(@Body() createOnboardingConfigDto: CreateOnboardingConfigDto) {
    return this.onboardingConfigService.create(createOnboardingConfigDto);
  }

  @Post()
  createMany(@Body() createOnboardingConfigDto: CreateOnboardingConfigDto[]) {
    return this.onboardingConfigService.createMany(createOnboardingConfigDto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.onboardingConfigService.find(+id);
  }

  @Get()
  findMany() {
    return this.onboardingConfigService.findMany();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnboardingConfigDto: UpdateOnboardingConfigDto) {
    return this.onboardingConfigService.update(+id, updateOnboardingConfigDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.onboardingConfigService.delete(+id);
  }
}
