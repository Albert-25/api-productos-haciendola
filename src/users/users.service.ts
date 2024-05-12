import { Injectable } from '@nestjs/common';
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
    const hashedPassword = await PasswordUtils.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByUserNameOrEmail(userNameOrEmail: string): Promise<User> {
    return await this.userRepository.findOne({
      where: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    const updatedUser = { ...user, ...updateUserDto };
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    await this.userRepository.delete(id);
    return user;
  }
}
