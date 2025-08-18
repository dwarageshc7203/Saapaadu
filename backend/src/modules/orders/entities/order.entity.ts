import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Hotspot } from '../../hotspots/entities/hotspot.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  oid: number;

  @Column()
  cid: number;

  @ManyToOne(() => Customer, customer => customer.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cid' })
  customer: Customer;

  @Column()
  hid: number;

  @ManyToOne(() => Hotspot, hotspot => hotspot.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hid' })
  hotspot: Hotspot;

  @Column()
  mealName: string;

  @Column()
  mealCount: number;

  @CreateDateColumn()
  otime: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'pending' })
  status: string; // pending | confirmed | completed | cancelled

}
