import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('https://guide-course-frontend.vercel.app/')
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ||3000);
}
bootstrap();
