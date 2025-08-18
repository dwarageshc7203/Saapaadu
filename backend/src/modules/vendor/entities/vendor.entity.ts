import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  phoneNumber: string;

  @Column()
  veg_nonveg: string;

  @Column()
  shopName: string;

  @Column()
  shopAddress: string;

  @Column()
  area: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @Column({ nullable: true })
  shopImage: string;

  @Column({ default: false })
  verification: boolean;

  @OneToOne(() => User, (user) => user.vendor)
  @JoinColumn()
  user: User;
}
