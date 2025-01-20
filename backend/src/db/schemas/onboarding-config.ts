import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../schema-utilities/timestamps';

export const onboardingConfig = pgTable('onboarding_config', {
  id: serial('id').primaryKey(),

  stepOne: text('step_one').array().notNull(),
  stepTwo: text('step_two').array().notNull(),
  stepThree: text('step_three').array().notNull(),

  ...timestamps
});
