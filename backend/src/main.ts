import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://guide-course-frontend.vercel.app',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ||3000);
}
bootstrap();
