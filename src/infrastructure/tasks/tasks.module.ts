import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { TaskService } from 'src/application/services/tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepositoryImpl } from 'src/infrastructure/persistence/task.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TaskService,
    { provide: 'ITaskRepository', useClass: TaskRepositoryImpl },
  ],
  exports: [TaskService],
})
export class TasksModule {}
