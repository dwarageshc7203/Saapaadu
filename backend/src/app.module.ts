import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { HotspotModule } from './modules/hotspots/hotspot.module';
import { CustomerModule } from './modules/customer/customer.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { OrderModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST!,   // "!" tells TS we guarantee it's defined
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  autoLoadEntities: true,
  synchronize: true,
}),
    AuthModule,
    CustomerModule,
    VendorModule,
    HotspotModule,
    OrderModule,
  ],
})
export class AppModule {}
