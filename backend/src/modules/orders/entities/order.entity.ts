import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Vendor } from 'src/modules/vendor/entities/vendor.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  oid: number;

  @Column() cid: number;

  @ManyToOne(() => Customer, (c) => c.orders, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'cid' })
  customer: Customer | null;

  @Column() uid: number; // redun: user id if needed for audit

  @Column() mealName: string;
  @Column('int') mealCount: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  otime: Date;

  @Column('decimal', { precision: 10, scale: 2 }) price: number;

  // link order to vendor (useful for vendor bookings)
  @Column({ nullable: true }) vid?: number;

  @ManyToOne(() => Vendor, (v) => v.orders, { nullable: true })
  @JoinColumn({ name: 'vid' })
  vendor?: Vendor | null;
}
