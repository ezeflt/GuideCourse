import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { GuideModule } from "../guide/guide.module";
import { CourseModule } from "../course/course.module";
import * as cors from 'cors';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.ACCES_DATABASE),
    GuideModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(cors({
        origin: '*', // Autorise toutes les origines (à des fins de développement)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type',
        credentials: true, // Autorise l'envoi de cookies et d'autres informations d'identification
      }))
      .forRoutes('*'); // Appliquez le middleware CORS à toutes les routes
  }
}
