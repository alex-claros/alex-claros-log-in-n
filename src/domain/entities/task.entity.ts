import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tags.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, user => user.tasks)
  user: User;

  @ManyToMany(() => Tag, tag => tag.tasks)
  @JoinTable()
  tags: Tag[];
}