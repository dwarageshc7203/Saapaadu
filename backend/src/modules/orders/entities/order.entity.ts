// backend/src/modules/orders/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Vendor } from 'src/modules/vendor/entities/vendor.entity';
import { Hotspot } from 'src/modules/hotspots/entities/hotspot.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  oid: number;

  @Column()
  cid: number;

  @ManyToOne(() => Customer, (c) => c.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cid' })
  customer: Customer;

  @Column()
  vid: number;

  @ManyToOne(() => Vendor, (v) => v.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vid' })
  vendor: Vendor;

  @Column()
  hid: number;

  @ManyToOne(() => Hotspot, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'hid' })
  hotspot: Hotspot;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
