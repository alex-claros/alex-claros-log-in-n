import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { TagService } from 'src/application/services/tags.service';
  import { Tag } from 'src/domain/entities/tags.entity';
  
  @Controller('tags')
  export class TagsController {
    constructor(private readonly tagService: TagService) {}
  
    @Post()
    async createTag(@Body() body: { name: string }): Promise<Tag> {
      return this.tagService.createTag(body.name);
    }
  
    @Get()
    async getAllTags(): Promise<Tag[]> {
      return this.tagService.getAllTags();
    }
  
    @Get(':id')
    async getTagById(@Param('id') id: string): Promise<Tag> {
      return this.tagService.getTagById(Number(id));
    }
  
    @Patch(':id')
    async updateTag(
      @Param('id') id: string,
      @Body() body: { name: string },
    ): Promise<Tag> {
      return this.tagService.updateTag(Number(id), body.name);
    }
  
    @Delete(':id')
    async deleteTag(@Param('id') id: string): Promise<{ message: string }> {
      return this.tagService.deleteTag(Number(id));
    }
  }
  