import { Injectable, Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from './drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as allSchemas from './all-schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleUtilsService {
  constructor(@Inject(DrizzleAsyncProvider) private readonly db: NodePgDatabase<typeof allSchemas>) {}

  async softDelete(table: any, idColumn: any, idValue: string): Promise<void> {
    await this.db.update(table).set({ deletedAt: new Date() }).where(eq(idColumn, idValue));
  }

  async restore(table: any, idColumn: any, idValue: string): Promise<void> {
    await this.db.update(table).set({ deletedAt: null }).where(eq(idColumn, idValue));
  }
}
