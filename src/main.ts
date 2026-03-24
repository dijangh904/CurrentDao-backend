import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });
  
  // API prefix
  app.setGlobalPrefix('api');
  
  // Swagger documentation
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('CurrentDao Backend API')
      .setDescription('CurrentDao Energy Market Forecasting System API')
      .setVersion('1.0')
      .addTag('forecasting')
      .addTag('app')
      .addTag('health')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API documentation: http://localhost:${port}/api/docs`);
  console.log(`🔗 API endpoint: http://localhost:${port}/api`);
}
bootstrap();
