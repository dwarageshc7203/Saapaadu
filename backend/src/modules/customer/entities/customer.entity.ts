import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.customers, { onDelete: 'CASCADE' })
  user: User;   // ✅ single user, not array

  @Column()
  username: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['veg', 'nonveg'] })
  veg_nonveg: 'veg' | 'nonveg';

  @Column()
  address: string;

  @Column()
  area: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
