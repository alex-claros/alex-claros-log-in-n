import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Task } from 'src/domain/entities/task.entity';

@Injectable()
export class TaskRepositoryImpl implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async create(task: Task): Promise<Task> {
    const newTask = this.repository.create(task);
    return await this.repository.save(newTask);
  }

  async findById(id: number): Promise<Task | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['tags', 'user'],
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.repository.find({
      relations: ['tags', 'user'],
    });
  }

  async update(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
