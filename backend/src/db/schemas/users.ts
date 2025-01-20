import { pgTable, serial, text, integer, date } from 'drizzle-orm/pg-core';
import { timestamps } from '../schema-utilities/timestamps';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  email: text('email').notNull().unique(),
  password: text('password').notNull(),

  aboutMe: text('about_me'),

  streetAddress: text('street_address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),

  birthdate: date('birthdate'),

  stepNumber: integer('step_number').notNull(),

  ...timestamps
});
