import { Tag } from '../entities/tags.entity';

export interface ITagRepository {
  create(tag: Tag): Promise<Tag>;
  findById(id: number): Promise<Tag | null>;
  findAll(): Promise<Tag[]>;
  update(tag: Tag): Promise<Tag>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Tag | null>;
}
