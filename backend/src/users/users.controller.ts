import { Controller, Get, Post, Delete, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckUserDto } from './dto/check-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post()
  createMany(@Body() createUserDto: CreateUserDto[]) {
    return this.usersService.createMany(createUserDto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.usersService.find(+id);
  }

  @Get()
  findMany() {
    return this.usersService.findMany();
  }

  @Post('/check')
  checkUser(@Body() checkUserDto: CheckUserDto) {
    return this.usersService.checkUser(checkUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
