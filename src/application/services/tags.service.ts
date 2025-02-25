import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { ITagRepository } from 'src/domain/repositories/tag.respository';
  import { Tag } from 'src/domain/entities/tags.entity';
  
  @Injectable()
  export class TagService {
    constructor(private readonly tagRepository: ITagRepository) {}
  
    async createTag(name: string): Promise<Tag> {
      try {
        const existingTag = await this.tagRepository.findByName(name);
        if (existingTag) {
          throw new ConflictException('La etiqueta ya existe');
        }
        const newTag = new Tag();
        newTag.name = name;
        return await this.tagRepository.create(newTag);
      } catch (error) {
        throw new InternalServerErrorException('Error al crear la etiqueta');
      }
    }
  
    async getAllTags(): Promise<Tag[]> {
      return await this.tagRepository.findAll();
    }
  
    async getTagById(id: number): Promise<Tag> {
      const tag = await this.tagRepository.findById(id);
      if (!tag) {
        throw new NotFoundException(`Etiqueta con ID ${id} no encontrada`);
      }
      return tag;
    }
  
    async updateTag(id: number, name: string): Promise<Tag> {
      const tag = await this.tagRepository.findById(id);
      if (!tag) {
        throw new NotFoundException(`Etiqueta con ID ${id} no encontrada`);
      }
      tag.name = name;
      return await this.tagRepository.update(tag);
    }
  
    async deleteTag(id: number): Promise<{ message: string }> {
      const tag = await this.tagRepository.findById(id);
      if (!tag) {
        throw new NotFoundException(`Etiqueta con ID ${id} no encontrada`);
      }
      await this.tagRepository.delete(id);
      return { message: 'Etiqueta eliminada correctamente' };
    }
  }
  