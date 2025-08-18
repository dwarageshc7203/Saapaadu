import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Hotspot } from 'src/modules/hotspots/entities/hotspot.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  vid: number;

  @Column()
  uid: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column() username: string;
  @Column({ nullable: true }) phoneNumber?: string;

  @Column({ type: 'enum', enum: ['veg', 'nonveg'], nullable: true })
  veg_nonveg?: 'veg' | 'nonveg';

  @Column() shopName: string;
  @Column() shopAddress: string;
  @Column() area: string;
  @Column() city: string;
  @Column() state: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: true }) latitude?: number;
  @Column('decimal', { precision: 10, scale: 6, nullable: true }) longitude?: number;

  @Column({ nullable: true }) shopImage?: string;
  @Column({ default: false }) verification: boolean;

  @OneToMany(() => Hotspot, (h) => h.vendor, { cascade: true })
  hotspots: Hotspot[];

  @OneToMany(() => Order, (o) => o.vendor)
  orders: Order[];
}
