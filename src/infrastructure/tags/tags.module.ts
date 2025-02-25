import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/domain/entities/tags.entity';
import { TagsController } from './tags.controller';
import { TagService } from 'src/application/services/tags.service';
import { TagRepositoryImpl } from 'src/infrastructure/persistence/tag.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [
    TagService,
    { provide: 'ITagRepository', useClass: TagRepositoryImpl },
  ],
  exports: [TagService],
})
export class TagsModule {}
