// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { HotspotModule } from './modules/hotspots/hotspot.module';
import { CustomerModule } from './modules/customer/customer.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { OrderModule } from './modules/orders/orders.module';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbType = (config.get<string>('DB_TYPE') || 'postgres').toLowerCase();
        if (dbType === 'sqlite') {
          return {
            type: 'sqlite' as const,
            database: config.get<string>('DB_PATH') || 'saapaadu.sqlite',
            autoLoadEntities: true,
            synchronize: true,
          };
        }
        // default to postgres
        return {
          type: 'postgres' as const,
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    AuthModule,
    CustomerModule,
    VendorModule,
    HotspotModule,
    OrderModule,
    MailerModule, // ✅ import custom mailer module
  ],
})
export class AppModule {}
