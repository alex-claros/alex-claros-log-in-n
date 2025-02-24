import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = this.repository.create({ email, password });
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async updateUser(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async deleteUser(id: number): Promise<number> {
    const result = await this.repository.delete(id);
    return result.affected ?? 0;
  }
}
