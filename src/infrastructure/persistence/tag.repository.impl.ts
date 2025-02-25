import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITagRepository } from 'src/domain/repositories/tag.respository';
import { Tag } from 'src/domain/entities/tags.entity';

@Injectable()
export class TagRepositoryImpl implements ITagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async create(tag: Tag): Promise<Tag> {
    const newTag = this.repository.create(tag);
    return await this.repository.save(newTag);
  }

  async findById(id: number): Promise<Tag | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Tag[]> {
    return await this.repository.find();
  }

  async update(tag: Tag): Promise<Tag> {
    return await this.repository.save(tag);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findByName(name: string): Promise<Tag | null> {
    return await this.repository.findOne({ where: { name } });
  }
}
