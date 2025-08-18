import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from '../vendor/vendor.entity';

@Entity()
export class VendorPrediction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.predictions)
  vendor: Vendor;

  @Column()
  date: string;

  @Column()
  meals_prepared: number;

  @Column()
  meals_sold: number;

  @Column()
  meals_resold: number;
}
