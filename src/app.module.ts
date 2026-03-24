import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TracingModule } from './tracing/tracing.module';
import { SecurityModule } from './security/security.module';
import { ApmModule } from './apm/apm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShardingModule } from './database/sharding/sharding.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/currentdao',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TracingModule,
    SecurityModule,
    ApmModule,
    ShardingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
