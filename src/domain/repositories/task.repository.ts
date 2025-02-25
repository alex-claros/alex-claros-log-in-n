import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findById(id: number): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  update(task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
}
