import { MiddlewareConsumer, Module } from "@nestjs/common";
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
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    // Utilisez le middleware CORS avec la configuration souhaitée
    consumer
      .apply(cors({
        origin: '*',
        credentials: true,
      }))
      .forRoutes('*');
  }
}
