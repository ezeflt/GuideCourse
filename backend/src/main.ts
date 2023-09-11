import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://guide-course-frontend.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    methods: ["GET", "POST","PUT"],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ||3000);
}
bootstrap();
