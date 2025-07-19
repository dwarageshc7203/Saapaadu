import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';
import { FoodModule } from './food/food.module';
import { CommonModule } from './common/common.module';
import { NotificationModule } from './notifications/notification.module';
import { UsersModule } from './users/users.module';

import { User } from './users/user.entity'; // ✅ Import User entity
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true, // ⚠️ Use only in development!
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    AuthModule,
    CustomerModule,
    VendorModule,
    FoodModule,
    CommonModule,
    NotificationModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtModule],
})
export class AppModule {}
