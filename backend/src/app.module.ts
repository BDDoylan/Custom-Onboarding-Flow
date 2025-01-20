import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './db/drizzle.module';
import { UsersModule } from './users/users.module';
import { OnboardingConfigModule } from "./onboarding-config/onboarding-config.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DrizzleModule,
    UsersModule,
    OnboardingConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
