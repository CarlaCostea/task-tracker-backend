import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT || 3000;
  console.log('Starting the application...');
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
