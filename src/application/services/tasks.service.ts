import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { ITaskRepository } from 'src/domain/repositories/task.repository';
  import { Task } from 'src/domain/entities/task.entity';
  
  @Injectable()
  export class TaskService {
    constructor(private readonly taskRepository: ITaskRepository) {}
  
    async createTask(
      title: string,
      description: string,
      status: string,
      dueDate: Date,
    ): Promise<Task> {
      try {
        const newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.status = status;
        newTask.dueDate = dueDate;
        // Si necesitas asignar usuario o etiquetas, agrégalo aquí
  
        return await this.taskRepository.create(newTask);
      } catch (error) {
        throw new InternalServerErrorException('Error al crear la tarea');
      }
    }
  
    async getAllTasks(): Promise<Task[]> {
      return await this.taskRepository.findAll();
    }
  
    async getTaskById(id: number): Promise<Task> {
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
      }
      return task;
    }
  
    async updateTask(
      id: number,
      updateData: Partial<Task>,
    ): Promise<Task> {
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
      }
  
      Object.assign(task, updateData);
      return await this.taskRepository.update(task);
    }
  
    async deleteTask(id: number): Promise<{ message: string }> {
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
      }
      await this.taskRepository.delete(id);
      return { message: 'Tarea eliminada correctamente' };
    }
  }
  