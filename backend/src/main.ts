import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: ['https://guide-course-frontend.vercel.app'],
    methods: ['GET', 'POST'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ||3000);
}
bootstrap();
