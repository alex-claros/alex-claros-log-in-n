import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email } });

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }

      const user = this.userRepository.create({ email, password });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async updateUser(id: number, email?: string, password?: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (email) user.email = email;
    if (password) user.password = password;

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);

    if (!result.affected || result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return { message: 'Usuario eliminado correctamente' };
  }
}
