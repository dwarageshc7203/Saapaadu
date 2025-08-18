import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Vendor } from '../../vendor/entities/vendor.entity';

export type UserRole = 'customer' | 'vendor' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['customer', 'vendor', 'admin'] })
  role: UserRole;

  @OneToOne(() => Customer, (c) => c.user)
  customer?: Customer;

  @OneToOne(() => Vendor, (v) => v.user)
  vendor?: Vendor;
}
