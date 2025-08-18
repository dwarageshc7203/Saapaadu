import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { DiscountUsage } from 'src/common/discount-usage.entity';
import { Order } from 'src/orders/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  area: string;

  @Column()
  city: string;

  @OneToMany(() => DiscountUsage, usage => usage.customer)
discountUsages: DiscountUsage[];

@OneToMany(() => Order, order => order.customer)
orders: Order[];


}
