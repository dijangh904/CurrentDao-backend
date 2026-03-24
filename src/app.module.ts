import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { HealthController as ApiHealthController } from './api-health.controller';
import { MarketForecastingModule } from './forecasting/market-forecasting.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [

  controllers: [AppController, HealthController, ApiHealthController],
  providers: [AppService],
})
export class AppModule {}
