// src/common/discount-usage.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class DiscountUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, customer => customer.discountUsages)
  customer: Customer;

  @Column()
  food_item_id: number;

  @CreateDateColumn()
  used_at: Date;
}
