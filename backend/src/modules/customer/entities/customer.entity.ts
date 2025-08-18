import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  uid: number;

@OneToOne(() => User, { eager: true })
@JoinColumn({ name: 'uid' })
user: User;


  @Column()
  username: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['veg', 'nonveg'], nullable: true })
  veg_nonveg: 'veg' | 'nonveg';

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  area: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @OneToMany(() => Order, order => order.customer)
orders: Order[];

}
