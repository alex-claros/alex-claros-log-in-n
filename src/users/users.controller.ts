import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: { email?: string; password?: string },
  ) {
    return this.usersService.updateUser(id, body.email, body.password);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
