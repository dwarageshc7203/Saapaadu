import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vendor } from 'src/modules/vendor/entities/vendor.entity';

@Entity()
export class Hotspot {
  @PrimaryGeneratedColumn()
  hid: number;

  @Column() vid: number;

  @ManyToOne(() => Vendor, (v) => v.hotspots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vid' })
  vendor: Vendor;

  @Column() shopName: string;
  @Column() shopAddress: string;
  @Column() area: string;
  @Column() city: string;
  @Column() state: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: true }) latitude?: number;
  @Column('decimal', { precision: 10, scale: 6, nullable: true }) longitude?: number;

  @Column({ nullable: true }) shopImage?: string;

  @Column({ type: 'enum', enum: ['veg', 'nonveg'] })
  veg_nonveg: 'veg' | 'nonveg';

  @Column() mealName: string;
  @Column('int') mealCount: number;
  @Column('decimal', { precision: 10, scale: 2 }) price: number;

  // Duration in minutes (e.g., 60 = 1 hour window)
  @Column('int') duration: number;
}
