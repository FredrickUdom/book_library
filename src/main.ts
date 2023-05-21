import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new MongoExceptionFilter);
  const port = 3000;
  await app.listen(port);
console.log(`we are running on port:${port}`);
}
bootstrap();
