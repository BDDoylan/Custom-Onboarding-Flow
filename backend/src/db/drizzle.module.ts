import { Module } from '@nestjs/common';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle.provider';
import { DrizzleUtilsService } from './drizzle.utils';

@Module({
  providers: [...drizzleProvider, DrizzleUtilsService],
  exports: [DrizzleAsyncProvider, DrizzleUtilsService],
})
export class DrizzleModule {}
