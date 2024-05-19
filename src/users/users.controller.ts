import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  @Get('me')
  async getLoggedInUser(@Req() req): Promise<User> {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Usuario no autenticado');
      }
      return req.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  @Get('search/:userNameOrEmail')
  async findByUserNameOrEmail(@Param('userNameOrEmail') userNameOrEmail: string) {
    try {
      return await this.usersService.findByUserNameOrEmail(userNameOrEmail);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  @Put('change-password/:id')
  async changePassword(@Param('id') id: string, @Body() passwordData: { currentPassword: string, newPassword: string }) {
    try {
      const { currentPassword, newPassword } = passwordData;
      return await this.usersService.changePassword(+id, currentPassword, newPassword);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(+id);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}
