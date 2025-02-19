import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Define la tabla en MySQL
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
