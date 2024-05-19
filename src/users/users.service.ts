import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordUtils } from '../utils/password-utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { userName, email } = createUserDto;

      const userWithSameUsername = await this.userRepository.findOne({ where: { userName } });
      if (userWithSameUsername) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }

      const userWithSameEmail = await this.userRepository.findOne({ where: { email } });
      if (userWithSameEmail) {
        throw new ConflictException('El correo ya está registrado');
      }

      const hashedPassword = await PasswordUtils.hashPassword(createUserDto.password);
      const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async changePassword(id: number, currentPassword: string, newPassword: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const isPasswordValid = await PasswordUtils.comparePasswords(currentPassword, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('La contraseña actual no es válida');
      }

      const hashedPassword = await PasswordUtils.hashPassword(newPassword);
      user.password = hashedPassword;

      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findByUserNameOrEmail(userNameOrEmail: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
      });
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) return null;

      const updatedUser = { ...user, ...updateUserDto };
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) return null;

      await this.userRepository.delete(id);
      return user;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}
