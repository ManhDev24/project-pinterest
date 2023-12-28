import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // main.ts or app.module.ts
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(8080);
}
bootstrap();
