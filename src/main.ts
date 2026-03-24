import otelSDK from './tracing/otel-sdk';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SecurityHeadersService } from './security/headers/security-headers.service';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  // Start the OpenTelemetry SDK
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);

  
  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });
  
  // API prefix
  app.setGlobalPrefix('api');
  

bootstrap();
