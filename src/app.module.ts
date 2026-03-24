import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { HealthController as ApiHealthController } from './api-health.controller';
import { MarketForecastingModule } from './forecasting/market-forecasting.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...databaseConfig(),
        autoLoadEntities: true,
      }),
    }),
    MarketForecastingModule,
  ],
  controllers: [AppController, HealthController, ApiHealthController],
  providers: [AppService],
})
export class AppModule {}
