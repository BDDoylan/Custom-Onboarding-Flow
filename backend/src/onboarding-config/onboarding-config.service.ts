import { Injectable, Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateOnboardingConfigDto } from './dto/create-onboarding-config.dto';
import { UpdateOnboardingConfigDto } from './dto/update-onboarding-config.dto';
import * as onboardingConfigSchema from 'src/db/schemas/onboarding-config';
import { eq } from 'drizzle-orm';
import { BaseService } from 'src/db/common/base.service';

@Injectable()
export class OnboardingConfigService extends BaseService<typeof onboardingConfigSchema.onboardingConfig, CreateOnboardingConfigDto, UpdateOnboardingConfigDto> {
  constructor(
    @Inject(DrizzleAsyncProvider)
    protected readonly db: NodePgDatabase<typeof onboardingConfigSchema>,
  ) {
    super(db, onboardingConfigSchema.onboardingConfig);
  }
}
