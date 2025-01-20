import { Module } from '@nestjs/common';
import { OnboardingConfigController } from './onboarding-config.controller';
import { OnboardingConfigService } from './onboarding-config.service';
import { DrizzleModule } from 'src/db/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [OnboardingConfigController],
  providers: [OnboardingConfigService],
  exports: [OnboardingConfigService],
})
export class OnboardingConfigModule {}
