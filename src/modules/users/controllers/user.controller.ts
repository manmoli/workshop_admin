import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  HttpCode,
  Query,
  ParseIntPipe
} from '@nestjs/common'

import { FindOptions } from '../../../utils/types'
import { EmptyStringToNull } from '../../../pipes/emptyStringToNull'
import { ParseNumericPipe } from '../../../pipes/parseNumericString'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../entities/users.entity'
import { UpdateUserDto } from '../dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(new EmptyStringToNull(), new ParseNumericPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @UsePipes(new ParseNumericPipe())
  @Get()
  findAll(@Query() findOptions: FindOptions<User>) {
    return this.userService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id)
  }
}
