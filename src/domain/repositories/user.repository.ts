import { User } from '../entities/user.entity';

export interface IUserRepository {
  createUser(email: string, password: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: number): Promise<number>;
}