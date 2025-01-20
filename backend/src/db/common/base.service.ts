import { Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InferInsertModel, eq, Table, inArray } from 'drizzle-orm';

interface BaseTable extends Table<any> {
  id: any;
}

export abstract class BaseService<
  TTable extends BaseTable,
  TCreateDto extends InferInsertModel<TTable>,
  TUpdateDto extends Partial<InferInsertModel<TTable>>,
> {
  constructor(
    @Inject(DrizzleAsyncProvider)
    protected readonly db: NodePgDatabase<any>,
    protected readonly table: TTable,
  ) {}

  create(createDto: TCreateDto) {
    return this.db.insert(this.table).values(createDto).returning();
  }

  createMany(createDtos: TCreateDto[]) {
    return this.db.insert(this.table).values(createDtos).returning();
  }

  find(id: number) {
    return this.db.select().from(this.table).where(eq(this.table.id, id)).limit(1);
  }

  findMany() {
    return this.db.select().from(this.table);
  }

  update(id: number, updateDto: TUpdateDto) {
    return this.db.update(this.table).set(updateDto).where(eq(this.table.id, id)).returning();
  }

  updateMany(ids: number[], updateDto: TUpdateDto) {
    return this.db.update(this.table).set(updateDto).where(inArray(this.table.id, ids)).returning();
  }

  delete(id: number) {
    return this.db.delete(this.table).where(eq(this.table.id, id)).returning();
  }

  deleteMany(ids: number[]) {
    return this.db.delete(this.table).where(inArray(this.table.id, ids)).returning();
  }

  softDelete(id: number) {
    return this.db.update(this.table).set({ deletedAt: new Date() }).where(eq(this.table.id, id)).returning();
  }

  softDeleteMany(ids: number[]) {
    return this.db.update(this.table).set({ deletedAt: new Date() }).where(inArray(this.table.id, ids)).returning();
  }
}
