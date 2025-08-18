import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Food } from 'src/food/food.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Food)
  food: Food;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected' | 'completed';

  @CreateDateColumn()
  ordered_at: Date;
}
