import { Injectable,NotFoundException,ConflictException,InternalServerErrorException,} from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(email: string, password: string): Promise<User> {
    try {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }

      return await this.userRepository.createUser(email, password);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async updateUser(id: number, email?: string, password?: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (email) user.email = email;
    if (password) user.password = password;

    return await this.userRepository.updateUser(user);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const affected = await this.userRepository.deleteUser(id);
    if (affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return { message: 'Usuario eliminado correctamente' };
  }
}
