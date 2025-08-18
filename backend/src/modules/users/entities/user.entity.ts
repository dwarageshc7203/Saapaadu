import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;   // ✅ lowercase everywhere

  @Column({ unique: true })
  email: string;      // ✅ lowercase everywhere

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['customer', 'vendor', 'admin'] })
  role: 'customer' | 'vendor' | 'admin';

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @OneToMany(() => Vendor, (vendor) => vendor.user)
  vendors: Vendor[];
}
