import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Vendor } from '../../vendor/entities/vendor.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

@Entity()
export class Hotspot {
  @PrimaryGeneratedColumn()
  hid: number;

  @Column()
  vid: number;

  @ManyToOne(() => Vendor, vendor => vendor.hotspots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vid' })
  vendor: Vendor;

  @Column()
  shopName: string;

  @Column()
  shopAddress: string;

  @Column({ nullable: true })
  area: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column({ nullable: true })
  shopImage: string;

  @Column({ type: 'enum', enum: ['veg', 'nonveg'], nullable: true })
  veg_nonveg: 'veg' | 'nonveg';

  @Column()
  mealName: string;

  @Column()
  mealCount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  duration: string;

  @OneToMany(() => Order, order => order.hotspot)
orders: Order[];

}
