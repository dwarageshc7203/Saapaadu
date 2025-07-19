import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Vendor } from 'src/vendor/vendor.entity';
import { Order } from 'src/orders/order.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  food_id: number;

  @ManyToOne(() => Vendor, vendor => vendor.foods)
  vendor: Vendor;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  original_price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  discounted_price: number;

  @Column()
  expiry_time: string; // e.g., "22:00" (10 PM)

  @Column({ default: false })
  is_sold_out: boolean;

  @CreateDateColumn()
  created_at: Date;

  // 👇 Add these:

  @Column({ type: 'timestamp', nullable: true })
  available_until: Date; // exact timestamp when listing becomes unavailable

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ nullable: true })
  area: string; // fallback if lat/lng not provided

  @OneToMany(() => Order, order => order.food)
orders: Order[];

}
