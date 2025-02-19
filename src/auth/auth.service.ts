import { Injectable, NotFoundException, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(email: string, password: string): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email } });

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ email, password: hashedPassword });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return true;
  }
}
