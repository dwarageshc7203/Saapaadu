import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  UId: number;

  @Column({ unique: true })
  UserName: string;

  @Column()
  Password: string;

  @Column({ unique: true })
  Email: string;

  @Column({ default: 'customer' })
  Role: string; // 'customer' | 'vendor' | 'admin'
}
