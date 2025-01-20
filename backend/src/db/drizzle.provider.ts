import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as allSchemas from './all-schemas';
import { ConfigService } from '@nestjs/config';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const pool = new Pool({
        connectionString: configService.getOrThrow('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false
        },
      });

      return drizzle(pool, {
        schema: { ...allSchemas },
      });
    },
  },
];
