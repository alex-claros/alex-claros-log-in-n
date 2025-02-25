import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { TaskService } from 'src/application/services/tasks.service';
  import { Task } from 'src/domain/entities/task.entity';
  
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post()
    async createTask(
      @Body() body: { title: string; description: string; status: string; dueDate: string },
    ): Promise<Task> {
      // Convertimos dueDate a Date
      const dueDate = new Date(body.dueDate);
      return this.taskService.createTask(body.title, body.description, body.status, dueDate);
    }
  
    @Get()
    async getAllTasks(): Promise<Task[]> {
      return this.taskService.getAllTasks();
    }
  
    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
      return this.taskService.getTaskById(Number(id));
    }
  
    @Patch(':id')
    async updateTask(
      @Param('id') id: string,
      @Body() body: Partial<Task>,
    ): Promise<Task> {
      return this.taskService.updateTask(Number(id), body);
    }
  
    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
      return this.taskService.deleteTask(Number(id));
    }
  }
  