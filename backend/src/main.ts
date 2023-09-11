import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from "@nestjs/platform-express";
import * as cors from 'cors'; // Importez le module cors

async function bootstrap() {

  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  const configService = app.get(ConfigService);
  app.use(cors({
    origin: 'https://guide-course-frontend.vercel.app',
    credentials: true,
  }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ||3000);
}
bootstrap();
