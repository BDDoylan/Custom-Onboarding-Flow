import { Injectable, Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckUserDto } from './dto/check-user.dto';
import * as usersSchema from 'src/db/schemas/users';
import { eq } from 'drizzle-orm';
import { BaseService } from 'src/db/common/base.service';

@Injectable()
export class UsersService extends BaseService<typeof usersSchema.users, CreateUserDto, UpdateUserDto> {
  constructor(
    @Inject(DrizzleAsyncProvider)
    protected readonly db: NodePgDatabase<typeof usersSchema>,
  ) {
    super(db, usersSchema.users);
  }

  async checkUser(checkUserDto: CheckUserDto) {
    return this.db.select().from(usersSchema.users).where(eq(usersSchema.users.email, checkUserDto.email) && eq(usersSchema.users.password, checkUserDto.password));
  }
}
