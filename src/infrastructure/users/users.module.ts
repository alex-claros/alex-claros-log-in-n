import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/application/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UserRepositoryImpl } from 'src/infrastructure/persistence/user.repository.impl';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, {
    provide: IUserRepository,
    useClass: UserRepositoryImpl,
  }],
  exports: [UsersService],
})
export class UsersModule {}
