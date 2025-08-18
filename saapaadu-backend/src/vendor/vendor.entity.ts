import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { VendorPrediction } from './vendor-prediction.entity';
import { Food } from 'src/food/food.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  vendor_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  hotel_name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  area: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  fssai_number: string;

@OneToMany(() => VendorPrediction, prediction => prediction.vendor)
predictions: VendorPrediction[];

@OneToMany(() => Food, food => food.vendor)
foods: Food[];


}
